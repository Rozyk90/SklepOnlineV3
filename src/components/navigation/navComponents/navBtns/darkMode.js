import React from "react";

import { useSelector, useDispatch } from "react-redux";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";

import { changeThemeDark } from "../../../../redux/slices/themeDark";

const DarkMode = () => {
  const themeDark = useSelector((state) => state.themeDark.themeDark);
  const dispatch = useDispatch();

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={() => dispatch(changeThemeDark())}
      color="inherit"
    >
      {themeDark ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};
export default DarkMode;
