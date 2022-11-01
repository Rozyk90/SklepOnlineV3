import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { setModal } from "../../../redux/slices/modals";
import { accCreate } from "../../../redux/slices/usersList";

const Register = () => {
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
    e.keyCode === 13 && createNewAcc();
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

  const createNewAcc = () => {
    if (checkNick()) {
      setLoginErrorTxt("Nazwa jest zajęta");
      setloginError(true);
    }

    if (!loginInpValue) {
      setLoginErrorTxt("Podaj nazwe użytkownika");
      setloginError(true);
    }

    if (!passInpValue) {
      setPassErrorTxt("Podaj hasło");
      setPassError(true);
    }

    if (passInpValue && !checkNick()) {
      dispatch(accCreate({ nick: loginInpValue, password: passInpValue }));
      dispatch(setModal({ modalName: "login" }));
    }
  };

  const checkNick = () => {
    const useedsNicks = usersList.map((x) => {
      return x.nick;
    });

    return useedsNicks.includes(loginInpValue) || !loginInpValue ? true : false;
  };

  const passTest = (value) => {
    const easy = "Trudność hasła - Łatwe";
    const mid = "Trudność hasła - Średnie";
    const hard = "Trudność hasła - Trudne";
    const hasNumber = /\d/;

    if (hasNumber.test(value) && passInpValue.length >= 5) {
      setPassErrorTxt(hard);
    } else if (value.length >= 5) {
      setPassErrorTxt(mid);
    } else if (value !== "") {
      setPassErrorTxt(easy);
    } else {
      setPassErrorTxt("");
    }
  };

  const changeLogin = (e) => {
    setLoginInpValue(e.target.value);
    setLoginErrorTxt("");
    setloginError(false);
  };

  const changePass = (e) => {
    setPassInpValue(e.target.value);
    passTest(e.target.value);
    setPassError(false);
  };

  return (
    <Modal
      open={modalIsOpen}
      onClose={() => {
        dispatch(setModal({ modalName: "login" }));
      }}
      aria-labelledby="modal-register"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          height: 350,
          bgcolor: "background.paper",
          border: "1px solid #000",
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
            Rejestracja
          </Typography>

          <Box
            sx={{
              mt: "20px",
              mb: "20px",
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

          <Button onClick={createNewAcc} variant="contained" color="success">
            Stwórz nowe konto
          </Button>
        </Container>
      </Box>
    </Modal>
  );
};

export default Register;
