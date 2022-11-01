import * as React from "react";
import { useSelector } from "react-redux";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TableComponent from "./basketHistoryComponents/table";

import DeleteBtn from "./basketHistoryComponents/deleteBtn";
import LoadingComponent from "../../../../reusingComponents/loading";

export default function BasketHistory() {
  const [expanded, setExpanded] = React.useState(false);

  const userId = useSelector((state) => state.userId);
  const historyArr = useSelector(
    (state) => state.usersList[userId].historyList
  );
  const status = useSelector((state) => state.products.status);

  const theme = useTheme();
  const smallSize = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{mt:10, mx: "auto", width: smallSize ? 450 : 800 }}>
      <Typography variant="h4" component="h2" align="center" sx={{ my: 5 }}>
        Historia zakupów
      </Typography>

      {status === "success" ? (
        historyArr
          .filter((obj) => !obj.deleted)
          .map((obj) => (
            <Accordion
              key={obj.id}
              expanded={expanded === `basketHistory${obj.id}`}
              onChange={handleChange(`basketHistory${obj.id}`)}
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
                aria-controls="basket history object"
                id={`basketHistory${obj.id}`}
              >
                <Typography
                  sx={{ fontWeight: "bold", width: "33%", flexShrink: 0 }}
                >
                  {obj.date}
                </Typography>
                <Typography
                  sx={{ fontWeight: "bold", color: "text.secondary" }}
                >
                  Koszt zakupów: {obj.sumPrice} zł
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <TableComponent list={obj.list} />

                <DeleteBtn basketListId={obj.id} userId={userId} />
              </AccordionDetails>
            </Accordion>
          ))
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
}
