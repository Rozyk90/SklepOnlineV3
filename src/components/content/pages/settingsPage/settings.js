import React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import useMediaQuery from "@mui/material/useMediaQuery";
import SettingsPhoto from "./settingsComponents/photo";
import SettingsNick from "./settingsComponents/nick";
import SettingsPassword from "./settingsComponents/password";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
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

export default function Settings() {
  const [value, setValue] = React.useState(0);

  const theme = useTheme();
  const smallSize = useMediaQuery(theme.breakpoints.down("md"));

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
        px: 3,
        borderRadius: 2,
        width: smallSize ? 450 : 700,
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        align="center"
        sx={{ mb: 1 }}
        color="primary"
      >
        Ustawienia
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Zdjecie" />
          <Tab label="Nick" />
          <Tab label="Hasło" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <SettingsPhoto />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <SettingsNick />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <SettingsPassword />
      </TabPanel>
    </Box>
  );
}
