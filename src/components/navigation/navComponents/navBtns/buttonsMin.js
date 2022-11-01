import React from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ButtonsMin = (prop) => {
  const theme = useTheme();
  const hambMenu = useMediaQuery(theme.breakpoints.down("md"));
  const handleOpenNavMenu = (event) => {
    prop.setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    prop.setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1, display: isMobile || hambMenu ? "flex" : "none" }}>
      <IconButton
        size="large"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={prop.anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(prop.anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: isMobile || hambMenu ? "flex" : "none",
        }}
      >
        {prop.pages.map((page) => (
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <Typography
              textAlign="center"
              component={Link}
              to={`/${page}`}
              sx={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {page}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ButtonsMin;
