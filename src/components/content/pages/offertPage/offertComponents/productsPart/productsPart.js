import React, { useState } from "react";

import Box from "@mui/material/Box";

import SortSelect from "./productsPartComponents/sortSelect";
import ProductCard from "./productsPartComponents/productCards";

const ProductsPart = () => {
  const [sort, setSort] = useState("");

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <SortSelect sort={sort} setSort={setSort} />

      <ProductCard sort={sort} />
    </Box>
  );
};

export default ProductsPart;
