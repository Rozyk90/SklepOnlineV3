import React from "react";

import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { useDispatch } from "react-redux";

import { resetId } from "../../../../../redux/slices/userId";

const Logout = (props) => {
  const dispatch = useDispatch();

  const name = "Wyloguj";

  const clickActions = () => {
    props.handleCloseUserMenu();
    dispatch(resetId());
  };

  return (
    <MenuItem key={name} onClick={clickActions}>
      <Typography textAlign="center">{name}</Typography>
    </MenuItem>
  );
};

export default Logout;
