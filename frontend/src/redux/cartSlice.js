import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload); // Adds a new item to cart
    },
    setCart: (state, action) => {
      state.cart = action.payload; // Updates the entire cart
    },
    clearCart: (state) => {
      state.cart = []; // Empties cart
    },
  },
});

export const { addToCart, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
