import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    user: null,
    token: null,
    cart: [],
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.cart = action.payload.cart;
      state.isLoggedIn = true;
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.cart = [];
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, addToCart, logout } = cartSlice.actions;
export default cartSlice.reducer;
