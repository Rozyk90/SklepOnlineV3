import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { accChangePhoto } from "../../../../../redux/slices/usersList";

const SettingsPhoto = () => {
  const [link, setLink] = useState("");

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const photoLink = useSelector((state) => state.usersList[userId].photo);

  const savePhoto = () => {
    dispatch(accChangePhoto({ userId: userId, newPhoto: link }));
  };

  const changeLink = (e) => {
    const value = e.target.value;
    setLink(value);
  };

  useEffect(() => {
    setLink(photoLink);
  }, []);

  return (
    <Box sx={{ px: 3, height: 200, display: "flex" }}>
      <Box sx={{ my: "auto", width: 100, height: 200 }}>
        <CardMedia
          sx={{ objectFit: "contain", width: 100, height: 1 / 1 }}
          component="img"
          image={link}
          alt="Brak zdjecia"
        />
      </Box>

      <Box sx={{ ml: 5, mt: 6, width: 5 / 5 }}>
        <TextField
          fullWidth
          value={link}
          onChange={(event) => {
            changeLink(event);
          }}
          id="newPhotoInp"
          label="Podaj link do zdjęcia"
          variant="outlined"
        />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Button
            onClick={() => {
              savePhoto();
            }}
            color="success"
            variant="contained"
            size="small"
          >
            Zapisz
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPhoto;
