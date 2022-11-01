import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import HomePage from "./pages/homePage/homePage";
import OffertPage from "./pages/offertPage/offertPage";
import BasketPage from "./pages/basketPage/basketPage";
import ContactPage from "./pages/contactPage/contactPage";
import Settings from "./pages/settingsPage/settings";
import BasketHistory from "./pages/basketHistoryPage/basketHistory";
import AdminPanel from "./pages/adminPanel/adminPanel";

const Content = () => {
  const userId = useSelector((state) => state.userId);
  const usersList = useSelector((state) => state.usersList);

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
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="Home" element={<HomePage />} />
      <Route path="Produkty" element={<OffertPage />} />
      <Route path="Koszyk" element={<BasketPage />} />
      <Route path="Kontakt" element={<ContactPage />} />

      <Route
        path="HistoriaZakupow"
        element={userId !== null ? <BasketHistory /> : <Navigate to="/" />}
      />
      <Route
        path="Ustawienia"
        element={userId !== null ? <Settings /> : <Navigate to="/" />}
      />
      <Route
        path="AdminPanel"
        element={adminTest() ? <AdminPanel /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default Content;
