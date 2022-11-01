import React from "react";

import { Link } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import IconButton from "@mui/material/IconButton";

const AdminPanelBtn = () => {
  return (
    <IconButton
      sx={{ ml: 1 }}
      color="inherit"
      component={Link}
      to={"/AdminPanel"}
    >
      <AdminPanelSettingsIcon />
    </IconButton>
  );
};
export default AdminPanelBtn;
