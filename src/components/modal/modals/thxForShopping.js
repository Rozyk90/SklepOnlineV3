import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "@mui/material/Modal";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

import { closeModal } from "../../../redux/slices/modals";

const ThxForShopping = () => {
  const isOpen = useSelector((state) => state.modal.open);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(closeModal());
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        dispatch(closeModal());
      }}
      aria-labelledby={`Thank you for shopping`}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 3,
          boxShadow: 4,
        }}
      >
        <CardMedia
          sx={{ mx: 1, my: "auto", height: "auto", width: 400 }}
          component="img"
          image="https://cdni.iconscout.com/illustration/premium/thumb/thank-you-for-shopping-4008307-3319956.png"
          alt=""
        />
      </Box>
    </Modal>
  );
};
export default ThxForShopping;
