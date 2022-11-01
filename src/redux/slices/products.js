import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    return fetch("https://fakestoreapi.com/products").then((res) => res.json());
  }
);

const initialState = {
  detailsProductId: null,
  productDelEditId: null,
  status: null,
  productsList: [],
  categoriesList: [],
  catNameToChange: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeItemCount: (state, { payload }) => {
      state.productsList.forEach((item, id) => {
        if (payload.id === item.id) {
          state.productsList[id].count = payload.newCount;
        }
      });
    },

    addRating: (state, { payload }) => {
      state.productsList.forEach((item) => {
        if (item.id === payload.itemId) {
          const oldCount = item.rating.count;
          const newCount = oldCount + 1;

          const oldRating = item.rating.rate * oldCount;
          const newRating = oldRating + payload.value;

          item.rating.rate = (newRating / newCount).toFixed(3);
          item.rating.count = newCount;
        }
      });
    },

    //   ----------------- CATEGORIES ------------------

    catAddNew: (state, { payload }) => {
      state.categoriesList.push({ name: payload.catName, productsWithCat: [] });
    },
    catDel: (state, { payload }) => {
      const catToDel = payload.catName;
      state.categoriesList = state.categoriesList.filter(
        (item) => item.name !== catToDel
      );
    },
    setCatNameToChange: (state, { payload }) => {
      const oldName = payload.oldName;
      state.catNameToChange = oldName;
    },
    resetCatNameToChange: (state) => {
      state.catNameToChange = "";
    },
    addIdToCat: (state, { payload }) => {
      const { catName, id } = payload;
      state.categoriesList.forEach((catObj) => {
        if (catObj.name === catName) catObj.productsWithCat.push(id);
      });
    },
    removeIdFromCat: (state, { payload }) => {
      const { catName, id } = payload;

      state.categoriesList = state.categoriesList.map((catObj) => {
        if (catObj.name === catName) {
          const arrWithIds = catObj.productsWithCat.filter(
            (idFromCat) => idFromCat !== id
          );
          return { name: catName, productsWithCat: arrWithIds };
        } else {
          return catObj;
        }
      });
    },
    changeCatName: (state, { payload }) => {
      const oldName = state.catNameToChange;
      const newName = payload.newName;

      state.categoriesList = state.categoriesList.map((obj) => {
        if (obj.name === oldName) {
          const cat = obj;
          cat.name = newName;
          return cat;
        } else {
          return obj;
        }
      });

      state.productsList = state.productsList.map((item) => {
        if (item.category === oldName) {
          const itemObj = item;
          itemObj.category = newName;
          return itemObj;
        } else {
          return item;
        }
      });
    },

    //   ----------------- CATEGORIES ------------------
    //   ----------------- PRODUCTS ------------------

    setDetailsId: (state, { payload }) => {
      state.detailsProductId = payload.id;
    },
    resetDetailsId: (state) => {
      state.detailsProductId = null;
    },

    setDelEditId: (state, { payload }) => {
      state.productDelEditId = payload.id;
    },
    resetDelEditId: (state) => {
      state.productDelEditId = null;
    },

    delProduct: (state) => {
      const idToDel = state.productDelEditId;
      state.productsList = state.productsList.map((item) => {
        if (item.id === idToDel) {
          return { ...item, deleted: true, count: 0 };
        } else {
          return item;
        }
      });
    },
    addProduct: (state, { payload }) => {
      state.productsList.push(payload.product);
    },
    editProduct: (state, { payload }) => {
      state.productsList = state.productsList.map((productObj) => {
        if (productObj.id === payload.product.id) {
          return payload.product;
        } else {
          return productObj;
        }
      });
    },
  },

  extraReducers: {
    [getProducts.pending]: (state) => {
      state.status = "loading";
    },

    [getProducts.fulfilled]: (state, { payload }) => {
      const testItem = {
        id: 0,
        title: "Test item",
        price: 15,
        deleted: false,
        description:
          "Test item Test item Test item Test item Test item Test item Test item Test item Test item Test item Test item Test item Test item Test item Test item Test item ",
        category: "men's clothing",
        image:
          "https://img.chceauto.pl/audi/a5/audi-a5-coupe-4327-47032_v1.jpg",
        rating: { rate: 2, count: 1 },
        count: 1,
      };

      const catNames = [];

      const listProducts = payload.map((x) => {
        const productCat = x.category;

        if (!catNames.includes(productCat)) {
          catNames.push(productCat);
        }
        return { ...x, deleted: false, count: x.rating.count };
      });

      listProducts.unshift(testItem);

      const listCategories = catNames.map((x) => {
        return { name: x, productsWithCat: [] };
      });

      listProducts.forEach((x) => {
        const thisProductCat = x.category;
        const thisProductId = x.id;

        listCategories.forEach((x) => {
          if (x.name === thisProductCat) {
            x.productsWithCat.push(thisProductId);
          }
        });
      });

      state.categoriesList = listCategories;
      state.productsList = listProducts;
      state.status = "success";
    },

    [getProducts.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const {
  setDetailsId,
  resetDetailsId,
  changeItemCount,
  addRating,
  catAddNew,
  catDel,
  setCatNameToChange,
  resetCatNameToChange,
  addIdToCat,
  removeIdFromCat,
  changeCatName,
  setDelEditId,
  resetDelEditId,
  delProduct,
  addProduct,
  editProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
