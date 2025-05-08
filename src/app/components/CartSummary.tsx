"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Button } from "@/components/ui/button";
const CartSummary = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white shadow rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Cart Summary</h2>
          <p className="text-gray-700">Total Items: {totalItems}</p>
          <p className="text-gray-800 font-semibold text-lg">
            Total Price: NPR. {totalPrice}
          </p>
        </div>

        <Button
        variant={'ghost'}
          className="mt-4 sm:mt-0 cursor-pointer px-6 py-2 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition duration-200"
          onClick={() => alert("Checkout logic here")}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
