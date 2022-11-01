import React from "react";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { accHistoryDel } from "../../../../../redux/slices/usersList";

const DeleteBtn = ({ basketListId, userId }) => {
  const dispatch = useDispatch();

  return (
    <Box>
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        color="error"
        onClick={() => {
          dispatch(accHistoryDel({ basketListId, userId }));
        }}
      >
        skasuj
      </Button>
    </Box>
  );
};
export default DeleteBtn;
