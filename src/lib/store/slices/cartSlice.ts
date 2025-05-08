"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProductsResponse } from "@/utils/types";


type CartItemType = getProductsResponse & { quantity: number };
type CartState = {
  cart: CartItemType[];
};


const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      const itemIndex = state.cart.findIndex(item => item._id === action.payload._id);

      if (itemIndex !== -1) {
        state.cart[itemIndex].quantity += action.payload.quantity;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find(i => i._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find(i => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});


export const { addToCart,removeCart } = cartSlice.actions;
export default cartSlice.reducer;
