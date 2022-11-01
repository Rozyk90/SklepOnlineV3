import React from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const HomePage = () => {
  return (
    <Box sx={{width: 450, p: 1, mt: 20, mx: "auto" }}>
      <Paper sx={{p:2, width: 'auto', height: "auto", mx: "auto" }} elevation={3}>
        <Typography sx={{ mb: 5, width: "auto" }} variant="h4" component="h1">
          Dostępy:
        </Typography>

        <Box>
          <Typography sx={{ width: "auto" }} variant="h5" component="h2">
            Gość
          </Typography>

          <List>
            <ListItem>
              <ListItemText>Rejestracja/Logowanie</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Wszystkie zakładki</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Dodawania przedmiotów do koszyka
              </ListItemText>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Typography sx={{ width: "auto" }} variant="h5" component="h2">
            Zalogowany użytkownik
          </Typography>

          <List>
            <ListItem>
              <ListItemText>Historia zakupów</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Ustawienia konta</ListItemText>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Typography sx={{ width: "auto" }} variant="h5" component="h2">
            Administrator
          </Typography>

          <List>
            <ListItem>
              <ListItemText>Lista przedmiotów</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Lista kategorii</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Lista uzytkowników</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Lista wiadomości</ListItemText>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Typography sx={{ width: "auto" }} variant="h5" component="h2">
            Dane do konta administratora
          </Typography>

          <List>
            <ListItem>
              <ListItemText>Nick: admin</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Hasło: a</ListItemText>
            </ListItem>
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default HomePage;
