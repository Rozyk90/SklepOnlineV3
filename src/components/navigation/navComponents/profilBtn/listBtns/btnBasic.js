import React from "react";

import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const BtnBasic = (props) => {
  return (
    <MenuItem
      to={`/${props.page}`}
      component={Link}
      key={props.txt}
      onClick={props.handleCloseUserMenu}
    >
      <Typography textAlign="center">{props.txt}</Typography>
    </MenuItem>
  );
};

export default BtnBasic;
