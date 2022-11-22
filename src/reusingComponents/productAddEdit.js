import React from "react";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";

import { closeModal } from "../redux/slices/modals";
import {
  addProduct,
  editProduct,
  addIdToCat,
  removeIdFromCat,
  resetDelEditId,
} from "../redux/slices/products";

const ProductAddEdit = () => {
  const [centerTxt, setCenterTxt] = useState("Nowy produkt");

  const [img, setImg] = useState(
    "https://andrukiewicz.elk.pl/wp-content/uploads/2014/09/brak-1-Kopia.jpg"
  );

  const [title, setTitle] = useState("");
  const [titleErrorTxt, setTitleErrorTxt] = useState("");
  const [titleError, setTitleError] = useState(false);

  const [cat, setCat] = useState("");
  const [catError, setCatError] = useState(false);

  const [description, setDescription] = useState("");

  const [count, setCount] = useState(0);
  const [countErrorTxt, setCountErrorTxt] = useState("");
  const [countError, setCountError] = useState(false);

  const [price, setPrice] = useState(0);
  const [priceErrorTxt, setPriceErrorTxt] = useState("");
  const [priceError, setPriceError] = useState(false);

  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.modal.open);
  const categoriesName = useSelector((state) =>
    state.products.categoriesList.map((catObj) => catObj.name)
  );
  const productsList = useSelector((state) => state.products.productsList);
  const nextProductId = useSelector(
    (state) => state.products.productsList.length
  );
  const editItemId = useSelector((state) => state.products.productDelEditId);
  const itemToEdit = useSelector(
    (state) => state.products.productsList[editItemId]
  );

  useEffect(() => {
    if (editItemId !== null) {
      const { category, count, description, image, price, title } = itemToEdit;
      setCenterTxt("Edytuj produkt");
      setImg(image);
      setTitle(title);
      setCat(category);
      setDescription(description);
      setCount(Number(count));
      setPrice(Number(price));
    }
  }, []);

  const createObj = () => {
    let rating = { rate: 0, count: 0 };
    let id = nextProductId;

    if (editItemId !== null) {
      // only if item is edit
      rating = itemToEdit.rating;
      id = itemToEdit.id;
    }

    const product = {
      id: id,
      title,
      price: Number(price.toFixed(2)),
      deleted: false,
      description,
      category: cat,
      image: img,
      rating: rating,
      count: Number(Math.floor(count)),
    };
    return product;
  };

  const testProduct = () => {
    const testArr = [];
    const usedTitles = [];

    productsList.forEach((product) => {
      if (!product.deleted) usedTitles.push(product.title);
    });

    if (title === "") {
      setTitleError(true);
      setTitleErrorTxt("Podaj tytuł.");
      testArr.push(false);
    } else if (usedTitles.includes(title)) {
      if (itemToEdit.title === title) {
        return true;
      } else {
        setTitleError(true);
        setTitleErrorTxt("Istnieje już taki tytuł.");
        testArr.push(false);
      }
    } else {
      testArr.push(true);
    }

    if (cat === "") {
      setCatError(true);
      testArr.push(false);
    }

    if (count === "") {
      setCountError(true);
      setCountErrorTxt("Podaj poprawną ilość.");
      testArr.push(false);
    }

    if (price === "") {
      setPriceError(true);
      setPriceErrorTxt("Podaj cenę.");
      testArr.push(false);
    }
    return !testArr.includes(false);
  };

  const productAdd = () => {
    if (testProduct()) {
      const product = createObj();

      if (editItemId === null) {
        dispatch(addProduct({ product }));
        dispatch(addIdToCat({ catName: cat, id: nextProductId }));
        cancel();
      } else {
        dispatch(editProduct({ product }));
        cancel();

        if (itemToEdit.category !== cat) {
          dispatch(addIdToCat({ catName: cat, id: itemToEdit.id }));
          dispatch(
            removeIdFromCat({ catName: itemToEdit.category, id: itemToEdit.id })
          );
        }
      }
    }
  };

  const cancel = () => {
    dispatch(resetDelEditId());
    dispatch(closeModal());
  };

  const changeImg = (e) => {
    setImg(e.target.value);
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);

    if (titleError) {
      setTitleError(false);
      setTitleErrorTxt("");
    }
  };

  const changeCategory = (e) => {
    setCat(e.target.value);
    setCatError(false);
  };

  const changeDescription = (e) => {
    setDescription(e.target.value);
  };

  const changeCount = (e) => {
    const inpValue = e.target.value;
    const regex = /^[0-9]*$/g;
    if (regex.test(inpValue)) {
      if (
        inpValue === "NaN" ||
        inpValue === undefined ||
        inpValue === null ||
        inpValue === ""
      ) {
        setCount(0);
      } else {
        setCount(parseInt(inpValue, 10));
      }
    }
    setCountError(false);
    setCountErrorTxt("");
  };

  const changePrice = (e) => {
    const inpValue = e.target.value;
    const badString = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];
    if (!inpValue.includes("-") || !inpValue.includes("-")) {
      if (badString.includes(inpValue)) {
        const a = inpValue.slice(1);
        setPrice(a);
      } else {
        setPrice(Number(inpValue));
      }
    }
    setPriceError(false);
    setPriceErrorTxt("");
  };

  return (
    <Modal open={modalIsOpen} onClose={cancel}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          height: "auto",
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 3,
          boxShadow: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
        textAlign={"center"}
      >
        <Typography object="h2" variant="h4">
          {centerTxt}
        </Typography>

        <CardMedia
          sx={{ width: 1 / 1, height: 150, objectFit: "contain" }}
          component="img"
          image={img}
          alt="Item Photo"
        />

        <TextField
          id="productNewEditImg"
          label="Link do zdjecia"
          variant="outlined"
          onChange={changeImg}
        />

        <TextField
          id="productNewEditTitle"
          label="Tytuł"
          variant="outlined"
          error={titleError}
          helperText={titleErrorTxt}
          value={title}
          onChange={changeTitle}
        />
        <FormControl error={catError}>
          <InputLabel id="productNewEditSelectLabel">Kategoria</InputLabel>
          <Select
            id="productNewEditCat"
            value={cat}
            label="Kategoria"
            onChange={changeCategory}
          >
            {categoriesName.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="productNewEditDescription"
          label="Opis produktu"
          value={description}
          onChange={changeDescription}
          multiline
          rows={4}
        />

        <Box sx={{ display: "flex", gap: 3 }}>
          <TextField
            label="Ilość"
            id="productNewEditCatValue"
            error={countError}
            helperText={countErrorTxt}
            value={count}
            onChange={changeCount}
            InputProps={{
              endAdornment: <InputAdornment position="end">szt</InputAdornment>,
            }}
          />

          <TextField
            label="Cena"
            id="productNewEditCatPrice"
            type="number"
            min="0"
            error={priceError}
            helperText={priceErrorTxt}
            value={price}
            onChange={changePrice}
            InputProps={{
              endAdornment: <InputAdornment position="end">zł</InputAdornment>,
            }}
          />
        </Box>
        <Box
          sx={{
            width: "auto",
            display: "flex",
            gap: 3,
            justifyContent: "space-around",
          }}
        >
          <Button variant="outlined" color="success" onClick={productAdd}>
            Dodaj
          </Button>
          <Button variant="outlined" color="error" onClick={cancel}>
            Anuluj
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default ProductAddEdit;
