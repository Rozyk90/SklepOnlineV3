import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { basketChange, basketDelete } from "../../../redux/slices/basket";
import { closeModal } from "../../../redux/slices/modals";

const ChangeBasketValue = () => {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.modal.open);
  const basket = useSelector((state) => state.basket);
  const productsList = useSelector((state) => state.products.productsList);
  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.up("md"));

  const changeValue = () => {
    basket.forEach((item) => {
      const productCount = productsList[item.id].count;
      const basketValue = item.value;

      if (productCount === 0) {
        dispatch(basketDelete({ id: item.id }));
      } else if (productCount < basketValue) {
        dispatch(basketChange({ id: item.id, newValue: productCount }));
      }
    });
    dispatch(closeModal());
  };

  return (
    <Modal
      open={modalIsOpen}
      onClose={() => {
        dispatch(closeModal());
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: large ? 700 : 450,
          height: "auto",
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 3,
          boxShadow: 4,
        }}
      >
        <Typography sx={{ mb: 2 }} variant="h6" align="center" component="h3">
          Brak wymaganych ilości
        </Typography>

        <TableContainer sx={{ boxShadow: 5 }} component={Paper}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Nazwa</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Dostepna ilość
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Twoja ilość
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {basket
                .filter((x) => {
                  const itemId = x.id;
                  const productValue = productsList[itemId].count;
                  const basketValue = x.value;
                  return productValue < basketValue && x;
                })
                .map((item) => {
                  const itemId = item.id;
                  const { count, title } = productsList[itemId];

                  return (
                    <TableRow
                      key={itemId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {title}
                      </TableCell>
                      <TableCell align="right">{count}</TableCell>
                      <TableCell align="right">{item.value}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            mt: 3,
            height: "auto",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            OK
          </Button>
          <Tooltip title="W przypadku braku produktu, będzie on skasowany z kosza.">
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={() => {
                changeValue();
              }}
            >
              Zmień wartości
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangeBasketValue;
