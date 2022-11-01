import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { addMessage } from "../../../../redux/slices/contact";

const ContactPage = () => {
  const [title, setTitle] = useState("");
  const [contact, setContact] = useState("");
  const [contents, setContents] = useState("");

  const dispatch = useDispatch();
  const nextMessageId = useSelector((state) => state.contact.length);

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeContact = (e) => {
    setContact(e.target.value);
  };

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const send = () => {
    const date = new Date();
    const now = date.toLocaleString("pl");
    dispatch(
      addMessage({
        id: nextMessageId,
        date: now,
        deleted: false,
        title,
        contact,
        contents,
      })
    );
    setTitle("");
    setContact("");
    setContents("");
  };

  return (
    <Card
      sx={{
        p: 5,
        mt: 20,
        boxShadow: 10,
        mx: "auto",
        height: 650,
        width: 450,
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <Typography variant="h4" component="h2" align="center" sx={{ my: 5 }}>
        Formularz kontaktowy
      </Typography>

      <TextField
        id="contact-title"
        label="Tytuł"
        variant="outlined"
        value={title}
        onChange={changeTitle}
      />

      <TextField
        id="contact-email"
        label="Dane kontaktowe"
        variant="outlined"
        value={contact}
        onChange={changeContact}
      />

      <TextField
        id="contact-txt"
        label="Treść"
        multiline
        rows={5}
        variant="outlined"
        value={contents}
        onChange={changeContents}
      />

      <Tooltip
        title={
          title === "" || contact === "" || contents === ""
            ? "Wypełnij wszystkie pola"
            : ""
        }
        followCursor
      >
        <Box sx={{ mx: "auto" }}>
          <Button
            disabled={
              title === "" || contact === "" || contents === "" ? true : false
            }
            variant="contained"
            onClick={send}
          >
            Wyślij
          </Button>
        </Box>
      </Tooltip>
    </Card>
  );
};

export default ContactPage;
