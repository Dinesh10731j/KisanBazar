"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItems } from "@/utils/types";

type CartState = {
  cart: CartItems[];
};

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItems>) => {
      const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);

      if (itemIndex !== -1) {
        state.cart[itemIndex].quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },

    removeCart:(state,action:PayloadAction<number>)=>{
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
  },
});

export const { addToCart,removeCart } = cartSlice.actions;
export default cartSlice.reducer;
