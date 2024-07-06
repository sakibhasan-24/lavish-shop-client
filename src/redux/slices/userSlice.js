import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfoSetUp: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    userLogOutAction: (state, action) => {
      console.log(action);
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { userInfoSetUp, userLogOutAction } = userSlice.actions;
export default userSlice.reducer;
