import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { accChangeNick } from "../../../../../redux/slices/usersList";

const SettingsNick = () => {
  const [newNick, setNewNick] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorTxt, setErrorTxt] = useState("");

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const userName = useSelector((state) => state.usersList[userId].nick);

  const usersList = useSelector((state) => state.usersList);

  const changeNick = () => {
    const usedNicks = [];

    usersList.forEach((obj) => {
      !obj.deleted && usedNicks.push(obj.nick);
    });

    if (usedNicks.includes(newNick)) {
      const txt = "Podany nick jest zajęty";
      setErrorTxt(txt);
      setShowError(true);
    } else if (newNick === "") {
      setShowError(true);
    } else {
      dispatch(accChangeNick({ userId: userId, newNick: newNick }));
    }
  };

  const changeInp = (e) => {
    const value = e.target.value;
    setNewNick(value);

    if (value === "") {
      setShowError(true);
    } else {
      setErrorTxt("");
      setShowError(false);
    }
  };

  return (
    <Box
      sx={{
        gap: 3,
        height: 280,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" component="h3">
        Aktualny nick:
      </Typography>

      <Typography variant="h6" component="h4">
        {userName}
      </Typography>

      <TextField
        helperText={errorTxt}
        error={showError}
        value={newNick}
        onChange={(event) => {
          changeInp(event);
        }}
        id="newNickInp"
        label="Podaj nowy nick"
        variant="outlined"
      />

      <Button
        color="success"
        variant="contained"
        size="small"
        onClick={() => {
          changeNick();
        }}
      >
        Zapisz
      </Button>
    </Box>
  );
};

export default SettingsNick;
