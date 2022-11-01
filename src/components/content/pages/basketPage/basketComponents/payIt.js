import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { accHistoryAdd } from "../../../../../redux/slices/usersList";
import { setModal } from "../../../../../redux/slices/modals";
import { basketReset } from "../../../../../redux/slices/basket";
import { changeItemCount } from "../../../../../redux/slices/products";

const PayIt = ({ price }) => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket);
  const products = useSelector((state) => state.products.productsList);
  const userId = useSelector((state) => state.userId);

  const buyTest = () => {
    if (userId !== null) {
      const valueToChange = [];
      basket.forEach((item) => {
        const productFromList = products[item.id];
        if (productFromList.count < item.value) {
          valueToChange.push(item);
        }
      });

      valueToChange.length
        ? dispatch(setModal({ modalName: "changeBasketValue" }))
        : testSucceeded();
    }else{
      dispatch(setModal({ modalName: "login" }));
    }

  };

  const testSucceeded = () => {
    basket.forEach((item) => {
      const itemCount = products[item.id].count;
      dispatch(
        changeItemCount({ id: item.id, newCount: itemCount - item.value })
      );
    });

    const date = new Date();
    const now = date.toLocaleString("pl");
    const BasketHistoryObj = {
      deleted: false,
      sumPrice: price,
      list: basket,
      date: now,
    };

    dispatch(setModal({ modalName: "thxForShopping" }));
    dispatch(accHistoryAdd({ userId: userId, historyObj: BasketHistoryObj }));
    dispatch(basketReset());
  };

  return (
    <Box
      sx={{
        width: 4 / 5,
        py: 5,
        mx: "auto",
        mt: 5,
        borderTop: "2px solid grey",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Typography variant="h6" component="h4" color="#4caf50">
        Suma: {price.toFixed(2)} zł
      </Typography>

      <Button variant="contained" color="success" onClick={buyTest}>
        Płatność
      </Button>
    </Box>
  );
};

export default PayIt;
