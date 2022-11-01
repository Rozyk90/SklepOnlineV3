import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Buttons = (props) => {
  const basketSize = useSelector((state) => state.basket.length);
  const theme = useTheme();
  const hambMenu = useMediaQuery(theme.breakpoints.down("md"));

  const handleCloseNavMenu = () => {
    props.setAnchorElNav(null);
  };
  return (
    <>
      <Box
        sx={{ flexGrow: 1, display: isMobile || hambMenu ? "none" : "flex" }}
      >
        {props.pages.map((page) => (
          <Button
            component={Link}
            to={`/${page}`}
            key={page}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, mx: 1, color: "white", display: "block" }}
          >
            {page}
            {page === "Koszyk" ? (
              <Badge sx={{ ml: 1 }} badgeContent={basketSize} color="success">
                <ShoppingCartIcon />
              </Badge>
            ) : (
              <></>
            )}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default Buttons;
