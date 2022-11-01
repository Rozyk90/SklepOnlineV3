import React from "react";
import { isMobile } from "react-device-detect";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Filters from "./filtersComponent/filters";

const FiltersPart = () => {
  const theme = useTheme();
  const size = useMediaQuery(theme.breakpoints.down("md"));
  // { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 }

  return size || isMobile  ? (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="filters-header"
      >
        <Typography variant="h6">Filtry</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Filters />
      </AccordionDetails>
    </Accordion>
  ) : (
    <Filters />
  );
};

export default FiltersPart;

