import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import Button from "@mui/material/Button";

import { accAdminRights } from "../../../../../redux/slices/usersList";
import { setModal } from "../../../../../redux/slices/modals";
import { setDeleteId } from "../../../../../redux/slices/userToDelete";

function createData(userNick, userId, admin, del) {
  return {
    userNick,
    userId,
    admin,
    del,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "userNick",
    label: "Nick",
  },
  {
    id: "userId",
    label: "ID",
  },
  {
    id: "admin",
    label: "Administrator",
  },
  {
    id: "del",
    label: "Skasuj",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              hideSortIcon={true}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function UsersList() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const thisUserId = useSelector((state) => state.userId);
  const usersList = useSelector((state) =>
    state.usersList.filter((user) => user.deleted === false)
  );
  const usersTable = usersList.map((user) => {
    return createData(user.nick, user.id, user.admin, user.id === thisUserId);
  });
  const userId = useSelector((state) => state.userId);
  const label = { inputProps: { "aria-label": "Switch administrator rights" } };
  const dispatch = useDispatch();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={usersTable.length}
            />
            <TableBody>
              {stableSort(usersTable, getComparator(order, orderBy)).map(
                (row, index) => {
                  const openDeleteModal = () => {
                    dispatch(setModal({ modalName: "deleteUser" }));
                    dispatch(setDeleteId({ id: row.userId }));
                  };

                  return (
                    <TableRow key={row.userId}>
                      <TableCell component="th" scope="row" sx={{ pl: 2 }}>
                        {row.userNick}
                      </TableCell>
                      <TableCell>{row.userId}</TableCell>
                      <TableCell>
                        <Switch
                          {...label}
                          checked={row.admin ? true : false}
                          disabled={row.userId === userId ? true : false}
                          onChange={() => {
                            dispatch(accAdminRights({ userId: row.userId }));
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          disabled={row.del}
                          onClick={() => {
                            openDeleteModal();
                          }}
                          color="error"
                          variant="outlined"
                          size="small"
                        >
                          Skasuj
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={usersTable.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
