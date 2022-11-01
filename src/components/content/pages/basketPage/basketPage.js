import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import LoadingComponent from "../../../../reusingComponents/loading";
import SingleCard from "./basketComponents/singleCard";
import PayIt from "./basketComponents/payIt";
import EmptyBasket from "./basketComponents/emptyBasket";

const BasketPage = () => {
  const [sumPrice, setSumPrice] = useState(0);

  const basket = useSelector((state) => state.basket);
  const productsList = useSelector((state) => state.products.productsList);
  const status = useSelector((state) => state.products.status);

  const theme = useTheme();
  const smallCard = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    let sum = 0;

    if (status === "success") {
      basket.forEach((item) => {
        const price = productsList[item.id].price;
        const value = item.value;
        sum = sum + price * value;
      });

      if (sum !== sumPrice) {
        setSumPrice(sum);
      }
    }
  });

  return (
    <Box
      sx={{ width: smallCard ? 450 : 700, height: "auto", mx: "auto", my: 15 }}
    >
      {status === "success" &&
        basket.length > 0 &&
        basket.map((x) => <SingleCard key={x.id} id={x.id} value={x.value} />)}
      {status === "success" && basket.length > 0 && <PayIt price={sumPrice} />}
      {status === "loading" && <LoadingComponent />}
      {status === "success" && !basket.length && <EmptyBasket />}
    </Box>
  );
};

export default BasketPage;
