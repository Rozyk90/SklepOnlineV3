import React from "react";

import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

const EmptyBasket = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translate( -50%)",
      }}
    >
      <CardMedia
        sx={{ height: 250, width: "auto", mx: 1, my: "auto" }}
        component="img"
        image="https://www.meblezagrosze.pl/homepage/img/koszyk.png"
        alt="Obrazek z pustym koszem"
      />
    </Box>
  );
};

export default EmptyBasket;
