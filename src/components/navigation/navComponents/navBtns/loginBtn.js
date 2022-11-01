import React from "react";

import Button from "@mui/material/Button";

import { setModal } from "../../../../redux/slices/modals";

import { useDispatch } from "react-redux";

const LoginBtn = () => {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => {
        dispatch(setModal({ modalName: "login" }));
      }}
      aria-label="Login Button"
      color="inherit"
    >
      Login
    </Button>
  );
};

export default LoginBtn;
