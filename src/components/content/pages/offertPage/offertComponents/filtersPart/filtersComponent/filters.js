import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";

import {
  setPriceFilter,
  addCategory,
  removeCategory,
} from "../../../../../../../redux/slices/filters";

const Filters = () => {
  const [priceValue, setPriceValue] = React.useState([0, 0]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [marksArr, setMarksArr] = useState([
    {
      value: 0,
      label: "0 zł",
    },
    {
      value: 1,
      label: "1 zł",
    },
  ]);

  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products.productsList);
  const categoriesList = useSelector((state) => state.products.categoriesList);
  const catFilter = useSelector((state) => state.filters.catFilter);

  const setCategories = (e) => {
    const value = e.target.value;

    if (catFilter.includes(value)) {
      dispatch(removeCategory({ name: value }));
    } else {
      dispatch(addCategory({ name: value }));
    }
  };

  useEffect(() => {
    const arr = [];
    arr[0] = { value: minPrice, label: `${minPrice} zł` };
    arr[1] = { value: maxPrice, label: `${maxPrice} zł` };
    setMarksArr(arr);
  }, [minPrice, maxPrice]);

  const priceChange = (event, newValue) => {
    setPriceValue(newValue);
    dispatch(setPriceFilter({ min: newValue[0], max: newValue[1] }));
  };

  useEffect(() => {
    if (productsList.length !== 0) {
      const prices = productsList
        .filter((item) => {
          return catFilter.length === 0 || catFilter.includes(item.category);
        })
        .map((obj) => {
          return obj.price;
        });
      const minPriceValue = Math.floor(Math.min(...prices));
      const maxPriceValue = Math.ceil(Math.max(...prices));
      setMinPrice(minPriceValue);
      setMaxPrice(maxPriceValue);
      setPriceValue([minPriceValue, maxPriceValue]);
      dispatch(setPriceFilter({ min: minPriceValue, max: maxPriceValue }));
    }
  }, [productsList, catFilter]);

  return (
    <Box>
      <Paper elevation={3} sx={{ px: 3, mb: 5 }}>
        <Typography variant="h4" align="center">
          Kategorie
        </Typography>

        <FormGroup aria-label="position">
          {categoriesList.filter(catObj => catObj.productsWithCat.length>0).map((el) => {
            return (
              <FormControlLabel
                key={el.name}
                value={el.name}
                control={<Checkbox onClick={setCategories} />}
                label={el.name}
                labelPlacement="end"
                checked={catFilter.includes(el.name) ? true : false}
              />
            );
          })}
        </FormGroup>
      </Paper>

      <Paper elevation={3} sx={{ px: 8 }}>
        <Typography variant="h4" align="center">
          Kwota
        </Typography>

        <Slider
          getAriaLabel={() => "Filter price"}
          value={priceValue}
          onChange={priceChange}
          valueLabelDisplay="auto"
          min={minPrice}
          max={maxPrice}
          marks={marksArr}
        />
      </Paper>
    </Box>
  );
};

export default Filters;
