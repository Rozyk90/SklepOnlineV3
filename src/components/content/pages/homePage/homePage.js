import React from "react";

import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";

const HomePage = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translate( -50%)",
        mt: 15,
      }}
    >
      <CardMedia
        sx={{ maxHeight: 500, mx: 1, my: "auto", borderRadius: 3 }}
        height="auto"
        component="img"
        image="https://v-cg.etsystatic.com/video/upload/q_auto/VIDE%CC%81O-LISTINGS_txn0us.jpg"
        alt="Obrazek z pustym koszem"
      />
    </Box>
  );
};

export default HomePage;
