import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "../slices/cartSlice";
import userSliceReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    user: userSliceReducer,
  },
  // middleware: (getDefaultMiddleware)
});

export default store;
