import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { getProducts } from "./redux/slices/products";

import Navbar from "./components/navigation/navbar";
import Modals from "./components/modal/modals";
import Content from "./components/content/content";

const ThemeContext = React.createContext({ theme: {} });
export const useMyTheme = () => React.useContext(ThemeContext);

function App() {
  const themeDark = useSelector((state) => state.themeDark);
  const dispatch = useDispatch();

  const darkTheme = createTheme({
    palette: {
      mode: themeDark ? "dark" : "light",
    },
  });

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="App">
      <HashRouter>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />

          <Navbar />

          <Modals />

          <Content />
        </ThemeProvider>
      </HashRouter>
    </div>
  );
}

export default App;
