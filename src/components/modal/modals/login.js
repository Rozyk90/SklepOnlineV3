import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { closeModal, setModal } from "../../../redux/slices/modals";
import { changeId } from "../../../redux/slices/userId";

const Login = () => {
  const [loginError, setloginError] = useState(false);
  const [loginErrorTxt, setLoginErrorTxt] = useState("");
  const [loginInpValue, setLoginInpValue] = useState("");

  const [passError, setPassError] = useState(false);
  const [passErrorTxt, setPassErrorTxt] = useState("");
  const [passInpValue, setPassInpValue] = useState("");

  const modalIsOpen = useSelector((state) => state.modal.open);
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.usersList);

  window.addEventListener("keydown", (e) => {
    e.keyCode === 13 && loginTry();
  });

  const inputRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current.focus();
    }, 10);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const registerModal = () => {
    dispatch(setModal({ modalName: "register" }));
  };

  const loginTry = () => {
    loginInpValue && passInpValue ? checkUser() : setErrors();
  };

  const checkUser = () => {
    let userObj = usersList.find((x) => x.nick === loginInpValue);
    userObj !== undefined && !userObj.deleted
      ? checkPass(userObj.id)
      : setErrors();
  };

  const checkPass = (id) => {
    const pass = usersList[id].password;
    passInpValue === pass ? dispatch(changeId({ id: id })) : setErrors();
    passInpValue === pass && dispatch(closeModal());
  };

  const setErrors = () => {
    if (loginInpValue === "") {
      setloginError(true);
      setLoginErrorTxt("Wprowadz nazwe użytkownika");
    }

    if (passInpValue === "") {
      setPassError(true);
      setPassErrorTxt("Wprowadz hasło");
    }

    if (loginInpValue !== "" && passInpValue !== "") {
      setloginError(true);
      setLoginErrorTxt("Wprowadz poprawne dane");
      setPassError(true);
      setPassErrorTxt("Wprowadz poprawne dane");
    }
  };

  const resetErrors = () => {
    setloginError(false);
    setLoginErrorTxt("");
    setPassError(false);
    setPassErrorTxt("");
  };

  const changeLogin = (e) => {
    setLoginInpValue(e.target.value);
    resetErrors();
  };

  const changePass = (e) => {
    setPassInpValue(e.target.value);
    resetErrors();
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
          height: 420,
          bgcolor: "background.paper",
          border: "1px solid #000",
          boxShadow: 0,
          borderRadius: 2,
          p: 4,
        }}
        textAlign={"center"}
      >
        <Container maxWidth="sm">
          <Typography
            align="center"
            id="modal-login-title"
            variant="h4"
            component="h2"
          >
            Logowanie
          </Typography>

          <Box
            sx={{
              mt: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              height: "170px",
            }}
          >
            <TextField
              inputRef={inputRef}
              aria-label="Wprowadz nazwe użytkownika"
              label="Nazwa użytkownika"
              value={loginInpValue}
              onChange={changeLogin}
              error={loginError}
              helperText={loginErrorTxt}
              autoFocus
            ></TextField>

            <TextField
              aria-label="Wprowadz hasło"
              label="Hasło"
              value={passInpValue}
              onChange={changePass}
              error={passError}
              helperText={passErrorTxt}
              type="password"
            ></TextField>
          </Box>

          <Box
            sx={{
              borderBottom: "1px solid grey",
              pb: 2,
              my: 2,
            }}
          >
            <Button onClick={loginTry} variant="outlined">
              Zaloguj się
            </Button>
          </Box>

          <Button onClick={registerModal} variant="contained" color="success">
            Stwórz nowe konto
          </Button>
        </Container>
      </Box>
    </Modal>
  );
};

export default Login;
