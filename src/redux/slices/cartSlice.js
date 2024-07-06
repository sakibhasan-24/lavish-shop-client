import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItem: [], deliveryAddress: {}, paymentMethod: "PayPal" };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload);
      const item = action.payload;
      const exist = state.cartItem.find((newItem) => newItem._id === item._id);
      if (exist) {
        state.cartItem = state.cartItem.map((x) =>
          x._id === item._id ? item : x
        );
      } else {
        state.cartItem = [...state.cartItem, item];
      }
      state.cartPrice = Number(
        state.cartItem
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)
      );
      state.shippingPrice = state.cartPrice > 100 ? 0 : 10;
      state.taxPrice = Number((state.cartPrice * 0.15).toFixed(2));
      state.totalPrice = (
        Number(state.cartPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
      //   const exist = state.cartItem.find((it) => it._id === item._id);
    },

    removeFromCart: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item._id !== action.payload
      );
      state.cartPrice = Number(
        state.cartItem
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)
      );
    },

    saveDeliveryAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
      state.cartPrice = Number(
        state.cartItem
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)
      );
    },
  },
});

export const { addToCart, removeFromCart, saveDeliveryAddress } =
  cartSlice.actions;
export default cartSlice.reducer;
