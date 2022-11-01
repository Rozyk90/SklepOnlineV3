import React from "react";
import { useSelector, useDispatch } from "react-redux";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

import { setDetailsId } from "../../../../../../../redux/slices/products";
import { setModal } from "../../../../../../../redux/slices/modals";

const ProductCard = (prop) => {
  // { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 }

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products.productsList);
  const theme = useTheme();
  const oneCard = useMediaQuery(theme.breakpoints.down("md"));
  const highCard = useMediaQuery(theme.breakpoints.only("md"));
  const smallTitle = useMediaQuery(theme.breakpoints.down("xl"));

  const catFilter = useSelector((state) => state.filters.catFilter);
  const minPrice = useSelector((state) => state.filters.priceFilter.min);
  const maxPrice = useSelector((state) => state.filters.priceFilter.max);

  const sortFunc = (x, y) => {
    const sortBy = prop.sort;
    switch (sortBy) {
      case "priceRise":
        if (x.price > y.price) {
          return 1;
        } else if (x.price < y.price) {
          return -1;
        } else {
          return 0;
        }

      case "priceDecreas":
        if (x.price > y.price) {
          return -1;
        } else if (x.price < y.price) {
          return 1;
        } else {
          return 0;
        }

      case "ratingRise":
        if (x.rating.rate > y.rating.rate) {
          return 1;
        } else if (x.rating.rate < y.rating.rate) {
          return -1;
        } else {
          return 0;
        }

      case "ratingDecreas":
        if (x.rating.rate > y.rating.rate) {
          return -1;
        } else if (x.rating.rate < y.rating.rate) {
          return 1;
        } else {
          return 0;
        }

      case "aToZ":
        if (x.title.toUpperCase() > y.title.toUpperCase()) {
          return 1;
        } else if (x.title.toUpperCase() < y.title.toUpperCase()) {
          return -1;
        } else {
          return 0;
        }

      case "zToA":
        if (x.title.toUpperCase() > y.title.toUpperCase()) {
          return -1;
        } else if (x.title.toUpperCase() < y.title.toUpperCase()) {
          return 1;
        } else {
          return 0;
        }
    }
  };

  const showDetails = (id) => {
    dispatch(setModal({ modalName: "itemModal" }));
    dispatch(setDetailsId({ id: id }));
  };

  return (
    <Box sx={{ mt: 5, flexGrow: 1 }}>
      <Grid container spacing={4}>
        {productList
          .filter((item) => {
            return (
              !item.deleted &&
              (catFilter.length === 0 || catFilter.includes(item.category)) &&
              item.price >= minPrice &&
              item.price <= maxPrice
            );
          })
          .sort((x, y) => {
            return sortFunc(x, y);
          })
          .map((item) => {
            const { id, title, image, category, price, rating, count } = item;

            let countColor;
            let countTxt;

            if (count >= 300) {
              countColor = "#4caf50";
              countTxt = "Duża";
            } else if (count >= 150) {
              countColor = "#ff9800";
              countTxt = "Średnia";
            } else if (count >= 1) {
              countColor = "#ef5350";
              countTxt = "Mała";
            } else {
              countColor = "#9e9e9e";
              countTxt = "Brak produktu";
            }

            return (
              <Grid item xs={oneCard ? 12 : 6} key={id}>
                <Card sx={{ boxShadow: 8, height: highCard ? 350 : 300 }}>
                  <CardActionArea
                    sx={{ pl: 4, display: "flex", height: 5 / 5 }}
                    onClick={() => {
                      showDetails(id);
                    }}
                  >
                    <Box sx={{ width: 3 / 5, height: 4 / 5 }}>
                      <CardMedia
                        component="img"
                        sx={{
                          width: 1 / 1,
                          height: 1 / 1,
                          objectFit: "contain",
                        }}
                        image={image}
                        alt={title}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: 5 / 5,
                        height: 5 / 5,
                      }}
                    >
                      <CardContent
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography
                          component="h4"
                          variant={smallTitle ? "subtitle1" : "h6"}
                        >
                          {title}
                        </Typography>

                        <Typography color="text.secondary" component="h5">
                          {category}
                        </Typography>

                        <Typography
                          sx={{ mt: 2 }}
                          variant={smallTitle ? "subtitle1" : "h6"}
                          component="h5"
                        >
                          Cena: {price.toFixed(2)} zł
                        </Typography>

                        <Typography sx={{ color: countColor }} component="h5">
                          Dostepna ilość: {countTxt}
                        </Typography>

                        <Box
                          sx={{
                            width: 200,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Rating
                            name="Ocena produktu"
                            value={rating.rate}
                            readOnly
                            precision={0.1}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                          />

                          <Box sx={{ ml: 2 }} alt={`Ocena:${rating.count}`}>
                            {" "}
                            ({rating.count}){" "}
                          </Box>
                        </Box>
                      </CardContent>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default ProductCard;
