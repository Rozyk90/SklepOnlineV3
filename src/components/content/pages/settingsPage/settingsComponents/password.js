import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { accChangePass } from "../../../../../redux/slices/usersList";

const SettingsPassword = () => {
  const [currentPass, setCurrentPass] = useState("");
  const [currentPassError, setCurrentPassError] = useState(false);
  const [currentPassTxt, setCurrentPassTxt] = useState("");

  const [newPass, setNewPass] = useState("");
  const [newPassError, setNewPassError] = useState(false);
  const [newPassTxt, setNewPassTxt] = useState("");

  const [repeatPass, setRepeatPass] = useState("");
  const [repeatPassError, setRepeatPassError] = useState(false);
  const [repeatPassTxt, setRepeatPassTxt] = useState("");

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const currentUserPass = useSelector(
    (state) => state.usersList[userId].password
  );

  const saveNewPass = () => {
    if (currentUserPass !== currentPass) {
      setCurrentPassError(true);
      setCurrentPassTxt("Podaj poprawne hasło");
    } else if (currentUserPass === currentPass) {
      if (newPass !== repeatPass) {
        setNewPassTxt("");
        setNewPassError(true);
        setRepeatPassError(true);
        setRepeatPassTxt("Hasła różnią się");
      } else if (newPass === "" || repeatPass === "") {
        setNewPassError(true);
        setNewPassTxt("");
        setRepeatPassError(true);
        setRepeatPassTxt("Pola nie mogą być puste");
      } else if (currentUserPass === currentPass && newPass === repeatPass) {
        dispatch(accChangePass({ userId: userId, newPass: newPass }));
        setCurrentPass("");
        setCurrentPassError(false);
        setCurrentPassTxt("");
        setNewPass("");
        setNewPassError(false);
        setNewPassTxt("");
        setRepeatPass("");
        setRepeatPassError(false);
        setRepeatPassTxt("");
      }
    }
  };

  const passTest = (value) => {
    const easy = "Trudność hasła - Łatwe";
    const mid = "Trudność hasła - Średnie";
    const hard = "Trudność hasła - Trudne";
    const hasNumber = /\d/;

    if (hasNumber.test(value) && value.length >= 5) {
      setNewPassTxt(hard);
    } else if (value.length >= 5) {
      setNewPassTxt(mid);
    } else if (value !== "") {
      setNewPassTxt(easy);
    } else {
      setNewPassTxt("");
    }
  };

  const currentPassChange = (e) => {
    const value = e.target.value;
    setCurrentPass(value);
    setCurrentPassError(false);
    setCurrentPassTxt("");
  };

  const newPassChange = (e) => {
    const value = e.target.value;
    setNewPass(value);
    passTest(value);
    setNewPassError(false);
    setRepeatPassTxt("");
    setRepeatPassError(false);
  };

  const repeatPassChange = (e) => {
    const value = e.target.value;
    setRepeatPass(value);
    setNewPassError(false);
    setRepeatPassTxt("");
    setRepeatPassError(false);
  };

  return (
    <Box
      sx={{
        height: 350,
        display: "flex",
        gap: 3,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        helperText={currentPassTxt}
        error={currentPassError}
        value={currentPass}
        onChange={(event) => {
          currentPassChange(event);
        }}
        id="currentPassInp"
        label="Podaj aktualne hasło"
        variant="outlined"
        type="password"
      />

      <TextField
        helperText={newPassTxt}
        error={newPassError}
        value={newPass}
        onChange={(event) => {
          newPassChange(event);
        }}
        id="newPassInp"
        label="Podaj nowe hasło"
        variant="outlined"
        type="password"
      />

      <TextField
        helperText={repeatPassTxt}
        error={repeatPassError}
        value={repeatPass}
        onChange={(event) => {
          repeatPassChange(event);
        }}
        id="repeatPassInp"
        label="Powtórz nowe hasło"
        variant="outlined"
        type="password"
      />

      <Button
        color="success"
        variant="contained"
        size="small"
        onClick={() => {
          saveNewPass();
        }}
      >
        Zapisz
      </Button>
    </Box>
  );
};

export default SettingsPassword;
