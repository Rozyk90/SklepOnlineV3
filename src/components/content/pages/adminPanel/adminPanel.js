import React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import UsersList from "./adminPanelComponents/usersList";
import CategoriesList from "./adminPanelComponents/categoriesList";
import ProductsListTabel from "./adminPanelComponents/productsList";
import MessagesList from "./adminPanelComponents/messagesList";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <Box role="tabpanel" hidden={value !== index} id={`adminPanel-${index}`}>
      {value === index && (
        <Box sx={{ mt: 2 }}>
          <Typography component={"div"} variant={"body2"}>
            {children}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default function AdminPanel() {
  const [value, setValue] = React.useState(0);

  const theme = useTheme();
  const smallSize = useMediaQuery(theme.breakpoints.down("lg"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        border: `2px solid ${
          theme.palette.mode === "light"
            ? "#1976d2"
            : "rgba(255, 255, 255, 0.12)"
        }`,
        mx: "auto",
        mt: 20,
        pt: 1,
        px: 2,
        borderRadius: 2,
        width: smallSize ? 9/10 : 1200,
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        align="center"
        sx={{ mb: 1 }}
        color="primary"
      >
        Panel Administratora
      </Typography>

      <Box sx={{ fontWeight: 100, borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab sx={{ fontSize: 12 }} label="Produkty" />
          <Tab sx={{ fontSize: 12 }} label="Kategorie" />
          <Tab sx={{ fontSize: 12 }} label="Użytkownicy" />
          <Tab sx={{ fontSize: 12 }} label="Kontakt" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <ProductsListTabel />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <CategoriesList />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <UsersList />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <MessagesList />
      </TabPanel>
    </Box>
  );
}
