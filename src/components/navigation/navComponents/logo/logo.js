import React from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Typography from "@mui/material/Typography";

const Logo = (prop) => {
  const theme = useTheme();
  const hambMenu = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <ShoppingBagIcon
        sx={{ display: isMobile || hambMenu ? "none" : "flex", mr: 1 }}
      />
      <Typography
        variant="h6"
        noWrap
        component={Link}
        to="/"
        sx={{
          mr: 2,
          display: isMobile || hambMenu ? "none" : "flex",
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

export default Logo;
