import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { setModal } from "../../../../../redux/slices/modals";
import { setDetailsId } from "../../../../../redux/slices/products";
import { basketDelete, basketChange } from "../../../../../redux/slices/basket";

const SingleCard = ({ id, value }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const smallCard = useMediaQuery(theme.breakpoints.down("md"));
  const { title, image, price } = useSelector(
    (state) => state.products.productsList[id]
  );

  const showDetails = () => {
    dispatch(setModal({ modalName: "itemModal" }));
    dispatch(setDetailsId({ id: id }));
  };

  const setValue = (e) => {
    const inpValue = e.target.value;

    if (inpValue >= 1) {
      dispatch(basketChange({ id: id, newValue: inpValue }));
    } else {
      dispatch(basketChange({ id: id, newValue: 1 }));
    }
  };

  const deleteItem = () => {
    dispatch(basketDelete({ id: id }));
  };

  return (
    <Card
      sx={{ m: 1, display: "flex", height: smallCard ? 200 : 150 }}
      key={id}
      alt={title}
    >
      <CardMedia
        sx={{ width: 80, objectFit: "contain", mx: 1, my: "auto" }}
        component="img"
        image={image}
        alt={title}
      />

      <Typography
        variant="caption"
        component="h4"
        sx={{
          mx: 2,
          width: smallCard ? 120 : 200,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          href="#"
          color="inherit"
          underline="hover"
          onClick={() => {
            showDetails();
          }}
        >
          {title}
        </Link>
      </Typography>

      <Box
        sx={{ display: "flex", flexDirection: smallCard ? "column" : "row" }}
      >
        <Typography
          variant="caption"
          component="h4"
          align="center"
          sx={{ my: "auto", py: "auto", width: 120 }}
        >
          {price} zł
        </Typography>

        <TextField
          type="number"
          onChange={setValue}
          value={value}
          id={"basket-item" + id}
          sx={{ my: "auto", width: 120 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">szt</InputAdornment>,
          }}
        />
      </Box>

      <IconButton
        sx={{ height: 50, my: "auto" }}
        aria-label="delete"
        size="large"
        onClick={deleteItem}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Card>
  );
};

export default SingleCard;
