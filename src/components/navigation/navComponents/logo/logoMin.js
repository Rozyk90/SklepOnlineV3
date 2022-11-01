import React from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Typography from "@mui/material/Typography";

const LogoMin = (prop) => {
  const theme = useTheme();
  const hambMenu = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <ShoppingBagIcon
        sx={{ display: isMobile || hambMenu ? "flex" : "none", mr: 1 }}
      />
      <Typography
        variant="h5"
        noWrap
        component={Link}
        to="/"
        sx={{
          mr: 2,
          display: isMobile || hambMenu ? "flex" : "none",
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {prop.shopName}
      </Typography>
    </>
  );
};

export default LogoMin;
