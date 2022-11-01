import React from "react";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import ProductsPart from "./offertComponents/productsPart/productsPart";
import FiltersPart from "./offertComponents/filtersPart/filtersPart";
import LoadingComponent from "../../../../reusingComponents/loading";

const OffertPage = () => {
  const theme = useTheme();
  const lgSize = useMediaQuery(theme.breakpoints.up("lg"));
  const status = useSelector((state) => state.products.status);

  return status === "success" ? (
    <Box sx={{ mt: 15, p: 2, flexGrow: 1 }}>
      <Grid container spacing={lgSize ? 12 : 4}>
        <Grid item sm={12} md={isMobile ? 12 : 3}>
          <FiltersPart />
        </Grid>

        <Grid item sm={12} md={isMobile ? 12 : 9}>
          <ProductsPart />
        </Grid>
      </Grid>
    </Box>
  ) : (
    <LoadingComponent />
  );
};

export default OffertPage;
