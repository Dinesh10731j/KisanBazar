"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Trash } from "lucide-react";
import Image from "next/image";
import { removeCart } from "@/lib/store/slices/cartSlice";
import React from "react";


const CartItem = () => {
  const items = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto mt-24">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl shadow p-4"
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Image
                src={item.product_Image}
                alt={item.product_Name}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div>
                <h3 className="text-lg font-medium">{item.product_Name}</h3>
                <p className="text-gray-600">Qty: {item.quantity}</p>
                <p className="text-gray-800 font-semibold">Rs. {item.product_Price}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <p className="text-right font-semibold text-pink-600">
                Rs. {item.product_Price * item.quantity}
              </p>
              <button
                onClick={() => dispatch(removeCart(item.id))}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <Trash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItem;
