import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { closeModal } from "../../../redux/slices/modals";
import { basketAdd } from "../../../redux/slices/basket";
import { resetDetailsId } from "../../../redux/slices/products";

const SingleProductPage = () => {
  const itemId = useSelector((state) => state.products.detailsProductId);
  const { title, image, category, price, rating, count, description } =
    useSelector((state) => state.products.productsList[itemId]);
  const isOpen = useSelector((state) => state.modal.open);
  const dispatch = useDispatch();

  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.up("md"));

  let countColor;
  let countTxt;

  if (count >= 300) {
    countColor = "#4caf50";
    countTxt = "Duża";
  } else if (count >= 150) {
    countColor = "#ff9800";
    countTxt = "Średnia";
  } else if (count > 1) {
    countColor = "#ef5350";
    countTxt = "Mała";
  } else {
    countColor = "#9e9e9e";
    countTxt = "Brak produktu";
  }

  const addItemToBasket = () => {
    dispatch(basketAdd({ id: itemId }));
  };

  const close = () => {
    dispatch(resetDetailsId());
    dispatch(closeModal());
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        close();
      }}
      aria-labelledby={`Modal - ${title}`}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: large ? 800 : 450,
          height: "auto",
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 3,
          boxShadow: 4,
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ p: 1, height: "auto", maxHeight: 300 }}
          >
            <CardMedia
              component="img"
              sx={{ width: 1 / 1, height: 1 / 1, objectFit: "contain" }}
              image={image}
              alt={title}
            />
          </Grid>

          <Grid item xs={12} md={6} sx={{ p: 1, height: "auto" }}>
            <Typography component="h2" variant="h6">
              {title}
            </Typography>
            <Typography color="text.secondary" component="h3">
              {category}
            </Typography>
            <Typography sx={{ mt: 2 }} component="h3" variant="h6">
              Cena: {price} zł
            </Typography>
            <Typography sx={{ color: countColor }} component="h5">
              Dostepna ilość: {countTxt}
            </Typography>
            <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
              <Rating
                name="Ocena produktu"
                value={rating.rate}
                readOnly
                precision={0.1}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />

              <Box sx={{ ml: 2 }} alt={`Ocena:${rating.count}`}>
                {" "}
                ({rating.count}){" "}
              </Box>
            </Box>
            <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="success"
                onClick={addItemToBasket}
                disabled={count ? false : true}
              >
                Dodaj do koszyka
                <AddShoppingCartIcon sx={{ ml: 3 }} />
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} sx={{ p: 1, height: "auto" }}>
            <Typography component="h4" variant="body2">
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
export default SingleProductPage;
