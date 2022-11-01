import React from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";

import BtnBasic from "./listBtns/btnBasic";
import Logout from "./listBtns/btnLogout";

const ProfilBtn = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const userId = useSelector((state) => state.userId);
  const photoLink = useSelector((state) => state.usersList[userId].photo);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt="Profil photo" src={photoLink} />
      </IconButton>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <BtnBasic
          page={"HistoriaZakupow"}
          txt={"Historia zakupów"}
          handleCloseUserMenu={handleCloseUserMenu}
        />
        <BtnBasic
          page={"Ustawienia"}
          txt={"Ustawienia"}
          handleCloseUserMenu={handleCloseUserMenu}
        />

        <Logout handleCloseUserMenu={handleCloseUserMenu} />
      </Menu>
    </Box>
  );
};

export default ProfilBtn;
