import * as React from "react";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import { useSelector } from "react-redux";

import ProfilBtn from "./navComponents/profilBtn/profilBtn";
import LoginBtn from "./navComponents/navBtns/loginBtn";
import Logo from "./navComponents/logo/logo";
import LogoMin from "./navComponents/logo/logoMin";
import DarkMode from "./navComponents/navBtns/darkMode";
import Buttons from "./navComponents/navBtns/buttons";
import ButtonsMin from "./navComponents/navBtns/buttonsMin";
import AdminPanelBtn from "./navComponents/navBtns/adminPanel";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const userId = useSelector((state) => state.userId);
  const usersList = useSelector((state) => state.usersList);

  const pages = ["Home", "Produkty", "Koszyk", "Kontakt"];
  const shopName = "sklepV3";

  const adminTest = () => {
    const userObj =
      userId !== null && usersList.find((item) => item.id === userId);

    if (userObj) {
      return userObj.admin;
    } else {
      return false;
    }
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo shopName={shopName} />
          <Buttons pages={pages} setAnchorElNav={setAnchorElNav} />

          <ButtonsMin
            pages={pages}
            anchorElNav={anchorElNav}
            setAnchorElNav={setAnchorElNav}
          />
          <LogoMin shopName={shopName} />

          {adminTest() ? <AdminPanelBtn /> : <></>}
          <DarkMode />

          {userId === null ? <LoginBtn /> : <ProfilBtn />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
