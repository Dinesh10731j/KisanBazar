'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((acc, item) => {
    const numericPrice = parseInt(String(item.product_Price)?.replace(/[^\d]/g, ''), 10);
    return acc + numericPrice * item.quantity;
  }, 0);

  const handleRemove = (id: number) => {
    dispatch({ type: 'cart/removeCart', payload: id });
  };

  const handleIncrease = (id: number) => {
    dispatch({ type: 'cart/increaseQuantity', payload: id });
  };

  const handleDecrease = (id: number) => {
    dispatch({ type: 'cart/decreaseQuantity', payload: id });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-6">My Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty 😕</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4">
                <div className="flex items-center gap-4 w-full">
                  <Image
                    src={item.product_Image}
                    alt={item.product_Name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">{item.product_Name}</h2>
                    <p className="text-green-600">{item.product_Price}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleDecrease(item.id)}
                      >
                        <Minus className="w-4 h-4 cursor-pointer" />
                      </Button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleIncrease(item.id)}
                      >
                        <Plus className="w-4 h-4 cursor-pointer" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="mt-2 sm:mt-0"
                  onClick={() => handleRemove(item.id)}
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
              </Card>
            ))}
          </div>

          {/* Cart Summary */}
          <Card className="h-fit p-4">
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold">Summary</h2>
              <Separator />
              <div className="flex justify-between">
                <span>Total Items</span>
                <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total Price</span>
                <span>NPR {totalPrice}</span>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white mt-2">
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Cart;
