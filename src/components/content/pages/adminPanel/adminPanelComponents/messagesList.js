import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";

import { deleteMessage } from "../../../../../redux/slices/contact";

export default function MessagesList() {
  const [expanded, setExpanded] = React.useState(false);

  const dispatch = useDispatch();
  const list = useSelector((state) => state.contact);
  const theme = useTheme();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ mb: 2, mx: "auto" }}>
      <Typography variant="h4" component="h2" align="center" sx={{ my: 5 }}>
        Lista wiadomości
      </Typography>

      {list
        .filter((obj) => !obj.deleted)
        .map((obj) => (
          <Accordion
            key={obj.id}
            expanded={expanded === `message${obj.id}`}
            onChange={handleChange(`message${obj.id}`)}
            sx={{
              boxShadow: 10,
              my: 1,
              background:
                theme.palette.mode === "light"
                  ? "#1976d2"
                  : "rgba(255, 255, 255, 0.12)",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="messageList"
              id={`basketHistory${obj.id}`}
            >
              <Box
                sx={{
                  width: 1 / 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ m: 1, fontWeight: "bold" }}>
                  {obj.date}
                </Typography>

                <Typography sx={{ m: 1, fontWeight: "bold" }}>
                  {obj.title}
                </Typography>

                <Typography sx={{ m: 1, fontWeight: "bold" }}>
                  {obj.contact}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Paper sx={{ p: 2 }} elevation={3}>
                {obj.contents}
              </Paper>

              <Button
                sx={{ mt: 3 }}
                variant="contained"
                color="error"
                onClick={() => {
                  dispatch(deleteMessage({ id: obj.id }));
                }}
              >
                Skasuj
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
}
