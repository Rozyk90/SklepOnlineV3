import React from "react";

import { useSelector } from "react-redux";

import Login from "./modals/login";
import Register from "./modals/register";
import SingleProductPage from "./modals/singleProductPage";
import ChangeBasketValue from "./modals/changeBasketValue";
import ThxForShopping from "./modals/thxForShopping";
import DeleteUser from "./modals/deleteUser";
import CatAdd from "./modals/catAdd";
import CatNameChange from "./modals/catNameChange";
import ProductDel from "./modals/productDel";
import ProductAddEdit from "./../../reusingComponents/productAddEdit";

const Modals = () => {
  const modalIsOpen = useSelector((state) => state.modal.open);
  const modalName = useSelector((state) => state.modal.modalName);

  return (
    <>
      {(() => {
        if (modalIsOpen) {
          switch (modalName) {
            case "login":
              return <Login />;
            case "register":
              return <Register />;
            case "itemModal":
              return <SingleProductPage />;
            case "changeBasketValue":
              return <ChangeBasketValue />;
            case "thxForShopping":
              return <ThxForShopping />;
            case "deleteUser":
              return <DeleteUser />;
            case "catAdd":
              return <CatAdd />;
            case "catNameChange":
              return <CatNameChange />;
            case "productDel":
              return <ProductDel />;
            case "productAddEdit":
              return <ProductAddEdit />;
          }
        }
      })()}
    </>
  );
};

export default Modals;
