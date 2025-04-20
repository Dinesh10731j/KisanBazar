'use client';
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { Product } from "@/utils/types";
const CartItem = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  const increaseQty = (id: number) => {
    dispatch({ type: 'cart/increaseQuantity', payload: id });
  };

  const decreaseQty = (id: number) => {
    dispatch({ type: 'cart/decreaseQuantity', payload: id });
  };

  const removeCart = (id: number) => {
    dispatch({ type: 'cart/removeCart', payload: id });
  };

  return (
    <div className="space-y-6">
      {cart.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty 😕</div>
      ) : (
        <div className="text-center text-green-700 font-semibold">
          Total Price: {cart.reduce((acc, item) => acc + item.product_Price * item.quantity, 0)}
        </div>
      )}
      {cart.map((item:Product) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row justify-between items-center bg-white shadow rounded-lg p-4"
        >
          <div className="flex items-center gap-4">
            <Image
              src={item.product_Image}
              alt={item.product_Name}
              width={80}
              height={80}
              className="rounded-md"
            />
            <div>
              <h2 className="text-lg font-semibold">{item.product_Name}</h2>
              <p className="text-green-600">Rs.{item.product_Price}</p>

              <div className="flex items-center gap-2 mt-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => decreaseQty(item.id)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-6 text-center">{item.quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => increaseQty(item.id)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={() => removeCart(item.id)}
            className="mt-4 sm:mt-0 cursor-pointer"
          >
            <Trash2 className="w-5 h-5 text-red-500"  />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
