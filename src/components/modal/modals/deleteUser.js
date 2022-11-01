import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { closeModal } from "../../../redux/slices/modals";
import { resetDeleteId } from "../../../redux/slices/userToDelete";
import { accDelete } from "../../../redux/slices/usersList";

const DeleteUser = () => {
  const modalIsOpen = useSelector((state) => state.modal.open);
  const dispatch = useDispatch();
  const userToDelete = useSelector((state) => state.userToDelete);
  const user = useSelector((state) =>
    state.usersList.find((userObj) => userObj.id === userToDelete)
  );

  const cancelDel = () => {
    dispatch(closeModal());
    dispatch(resetDeleteId());
  };

  const confirmeDel = () => {
    dispatch(accDelete({ userId: user.id }));
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
          Czy chcesz skasować to konto?
        </Typography>

        <Typography object="h3" variant="h6">
          {`Nick: ${user.nick}`}
        </Typography>

        <Typography object="h3" variant="h6">
          {`ID: ${user.id}`}
        </Typography>

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

export default DeleteUser;
