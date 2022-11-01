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
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CardMedia from "@mui/material/CardMedia";

import { setDelEditId } from "../../../../../redux/slices/products";
import { setModal } from "../../../../../redux/slices/modals";

function createData(img, name, id, cat, price, count, rating) {
  return {
    img,
    name,
    id,
    cat,
    price,
    count,
    rating,
  };
}

function descendingComparator(a, b, orderBy) {
  if (orderBy !== "img") {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  } else {
    return 0;
  }
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
    id: "img",
    label: "",
  },
  {
    id: "name",
    label: "Tytuł",
  },
  {
    id: "id",
    label: "ID ",
  },
  {
    id: "cat",
    label: "Kategoria ",
  },
  {
    id: "price",
    label: "Cena ",
  },
  {
    id: "count",
    label: "Ilość ",
  },
  {
    id: "rating",
    label: "Ocena ",
  },
  {
    id: "del",
    label: "",
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

  const dontShowArrow = ["change", "del", "img"];

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
                dontShowArrow.includes(headCell.id)
                  ? false
                  : orderBy === headCell.id
              }
              direction={orderBy === headCell.id ? order : "asc"}
              hideSortIcon={dontShowArrow.includes(headCell.id) ? true : false}
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
          dispatch(setModal({ modalName: "productAddEdit" }));
        }}
        size="small"
        color="success"
        aria-label="Add new product"
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default function ProductsListTabel() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const dispatch = useDispatch();
  const productsList = useSelector((state) =>
    state.products.productsList
      .filter((item) => !item.deleted)
      .map((item) => {
        const { image, title, id, category, price, count, rating } = item;
        return createData(
          image,
          title,
          id,
          category,
          price,
          count,
          rating.rate
        );
      })
  );
  const editItem = (id) => {
    dispatch(setDelEditId({ id: id }));
    dispatch(setModal({ modalName: "productAddEdit" }));
  };

  const deleteItem = (id) => {
    dispatch(setDelEditId({ id: id }));
    dispatch(setModal({ modalName: "productDel" }));
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
              rowCount={productsList.length}
            />
            <TableBody>
              {stableSort(productsList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row" sx={{ pl: 2 }}>
                        <CardMedia
                          component="img"
                          sx={{
                            width: 40,
                            objectFit: "contain",
                            mx: 1,
                            my: "auto",
                          }}
                          image={row.img}
                          alt={row.title}
                        />
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.cat}</TableCell>
                      <TableCell>{row.price.toFixed(2)}</TableCell>
                      <TableCell>{row.count}</TableCell>
                      <TableCell>{row.rating}</TableCell>
                      <TableCell>
                        <Button
                          disabled={row.del}
                          color="error"
                          variant="outlined"
                          size="small"
                          id={`itemRowId - ${row.id}`}
                          onClick={() => {
                            deleteItem(row.id);
                          }}
                        >
                          Skasuj
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          color="info"
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            editItem(row.id);
                          }}
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
          count={productsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
