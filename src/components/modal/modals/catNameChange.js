import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { closeModal } from "../../../redux/slices/modals";
import {
  resetCatNameToChange,
  changeCatName,
} from "../../../redux/slices/products";
import { changeNameFilters } from "../../../redux/slices/filters";

const CatNameChange = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [errorTxt, setErrorTxt] = useState("");

  const modalIsOpen = useSelector((state) => state.modal.open);
  const dispatch = useDispatch();
  const usedNames = useSelector((state) =>
    state.products.categoriesList.map((cat) => cat.name)
  );
  const oldName = useSelector((state) => state.products.catNameToChange);

  const cancel = () => {
    dispatch(closeModal());
    dispatch(resetCatNameToChange());
  };

  const changeValue = (e) => {
    const value = e.target.value;
    setValue(value);
    setError(false);
    setErrorTxt("");
  };

  const changeName = () => {
    if (value === "") {
      setError(true);
      setErrorTxt("To pole nie może być puste.");
    } else if (usedNames.includes(value)) {
      setError(true);
      setErrorTxt("Istnieje taka kategoria.");
    } else {
      dispatch(changeCatName({ newName: value }));
      dispatch(changeNameFilters({ newName: value, oldName: oldName }));
      cancel();
    }
  };

  const inputRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current.focus();
    }, 10);
    setValue(oldName);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

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
        <Typography object="h2" variant="h6" sx={{ mb: 3 }}>
          Zmiana nazwy kategorii.
        </Typography>

        <TextField
          inputRef={inputRef}
          error={error}
          helperText={errorTxt}
          value={value}
          onChange={(e) => {
            changeValue(e);
          }}
          id="inpNewCatName"
          label="Nazwa"
          variant="outlined"
        />

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}>
          <Button
            color="success"
            variant="outlined"
            onClick={() => {
              changeName();
            }}
          >
            Zmień
          </Button>

          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              cancel();
            }}
          >
            Anuluj
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CatNameChange;
