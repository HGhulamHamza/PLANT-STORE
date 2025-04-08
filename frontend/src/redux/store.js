import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import thunk from "redux-thunk";

import userReducer from "./userSlice";
import cartReducer from "./cartSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cart"], // only persist user and cart
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
