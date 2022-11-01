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
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { setModal } from "../../../../../redux/slices/modals";
import {
  catDel,
  setCatNameToChange,
} from "../../../../../redux/slices/products";

function createData(catName, quantity, del) {
  return {
    catName,
    quantity,
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
    id: "catName",
    label: "Nazwa kategorii",
  },
  {
    id: "quantity",
    label: "Ilość użyć",
  },
  {
    id: "del",
    label: "Skasuj",
  },
  {
    id: "change",
    label: "",
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
              active={
                headCell.id === "change" ? false : orderBy === headCell.id
              }
              direction={orderBy === headCell.id ? order : "asc"}
              hideSortIcon={headCell.id === "change" ? true : false}
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

        <TableCell />
      </TableRow>
    </TableHead>
  );
}

const AddBtn = () => {
  const dispatch = useDispatch();

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab
        onClick={() => {
          dispatch(setModal({ modalName: "catAdd" }));
        }}
        size="small"
        color="success"
        aria-label="addNewCategory"
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default function CategoriesList() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const categoriesList = useSelector((state) =>
    state.products.categoriesList.map((cat) => {
      return createData(
        cat.name,
        cat.productsWithCat.length,
        cat.productsWithCat.length ? true : false
      );
    })
  );

  const dispatch = useDispatch();

  const changeCatName = (oldName) => {
    dispatch(setCatNameToChange({ oldName: oldName }));
    dispatch(setModal({ modalName: "catNameChange" }));
  };

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
        <AddBtn />
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={categoriesList.length}
            />
            <TableBody>
              {stableSort(categoriesList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow key={row.catName}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ pl: 2 }}
                        key={row.catName}
                      >
                        {row.catName}
                      </TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>
                        <Tooltip
                          title={
                            row.quantity
                              ? "Nie można skasować kategorii, która jest używana."
                              : ""
                          }
                          followCursor
                        >
                          <Box>
                            <Button
                              disabled={row.del}
                              onClick={() => {
                                dispatch(catDel({ catName: row.catName }));
                              }}
                              color="error"
                              variant="outlined"
                              size="small"
                            >
                              Skasuj
                            </Button>
                          </Box>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            changeCatName(row.catName);
                          }}
                          color="info"
                          variant="outlined"
                          size="small"
                        >
                          Edytuj
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={categoriesList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
