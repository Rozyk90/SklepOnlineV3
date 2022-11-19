import React from "react";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";

import { changeThemeDark } from "../../../../redux/slices/themeDark";

const DarkMode = () => {
  const themeDark = useSelector((state) => state.themeDark);
  const dispatch = useDispatch();
  const themeType = localStorage.getItem("theme");

  const changeTheme = () => {
    if (themeDark) {
      localStorage.setItem("theme", "light");
      dispatch(changeThemeDark());
    } else {
      localStorage.setItem("theme", "dark");
      dispatch(changeThemeDark());
    }
  };

  useEffect(() => {
    const themeType = localStorage.getItem("theme");
    if (themeType === "dark" && !themeDark) dispatch(changeThemeDark());
  }, []);

  return (
    <IconButton sx={{ ml: 1 }} onClick={changeTheme} color="inherit">
      {themeType === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};
export default DarkMode;
