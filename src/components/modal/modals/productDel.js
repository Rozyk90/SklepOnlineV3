import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";

import { closeModal } from "../../../redux/slices/modals";
import {
  delProduct,
  removeIdFromCat,
  resetDelEditId,
} from "../../../redux/slices/products";
import { basketDelete } from "../../../redux/slices/basket";

const ProductDel = () => {
  const modalIsOpen = useSelector((state) => state.modal.open);
  const dispatch = useDispatch();
  const productToDelId = useSelector(
    (state) => state.products.productDelEditId
  );
  const product = useSelector((state) =>
    state.products.productsList.find((item) => item.id === productToDelId)
  );

  const cancelDel = () => {
    dispatch(closeModal());
    dispatch(resetDelEditId());
  };

  const confirmeDel = () => {
    dispatch(delProduct());
    dispatch(basketDelete({ id: productToDelId }));
    dispatch(
      removeIdFromCat({ id: productToDelId, catName: product.category })
    );
    cancelDel();
  };

  return (
    <Modal
      open={modalIsOpen}
      onClose={() => {
        dispatch(closeModal());
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          height: "auto",
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 3,
          boxShadow: 4,
        }}
        textAlign={"center"}
      >
        <Typography object="h2" variant="h4" sx={{ mb: 3 }}>
          Skasować produkt?
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CardMedia
            component="img"
            sx={{ width: 40, objectFit: "contain", mx: 1, my: "auto" }}
            image={product.image}
            alt={product.title}
          />

          <Typography object="h3" variant="h6">
            {product.title}
          </Typography>
        </Box>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}>
          <Button
            color="success"
            variant="outlined"
            onClick={() => {
              confirmeDel();
            }}
          >
            Skasuj
          </Button>

          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              cancelDel();
            }}
          >
            Anuluj
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductDel;
