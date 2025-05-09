'use client';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { UseUserPayment } from '@/hooks/usePayment';
import Spinner from '@/app/components/Loader';
import { PaymentFormValues } from '@/utils/types';
import { addToast } from '@/lib/store/slices/toastSlice';

const Cart = () => {
  const [paymentMethod, setPaymentMethod] = useState<'onCash' | 'eSewa' | 'Khalti' | ''>('');
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const paymentMutation = UseUserPayment();

  const totalPrice = cartItems.reduce((acc, item) => {
    const numericPrice = parseInt(String(item.price)?.replace(/[^\d]/g, ''), 10);
    return acc + numericPrice * item.quantity;
  }, 0);

  const handleRemove = (id: string) => {
    dispatch({ type: 'cart/removeCart', payload: id });
  };

  const handleIncrease = (id: string) => {
    dispatch({ type: 'cart/increaseQuantity', payload: id });
  };

  const handleDecrease = (id: string) => {
    dispatch({ type: 'cart/decreaseQuantity', payload: id });
  };

  const handleCheckout = () => {
    if (!paymentMethod) {
      dispatch(addToast({ message: 'Please select a payment method', type: 'error' }));
      return;
    }

    const formValues: PaymentFormValues = {
      customerName: '6810b62e87201f91a314be4b', 
      farmerIds:cartItems.map((item)=>item.farmerId.toString()),
      productIds: cartItems.map((item) => item._id.toString()),
      amount: totalPrice,
      products: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      orderId: [uuidv4()],
      paymentMethod,
    };

    console.log("This is farmerIds",formValues)


    paymentMutation.mutate(formValues, {
      onSuccess: (data) => {
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else {
          alert('Payment successful!');
        }
      },
    });
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
              <Card key={item._id} className="flex flex-col sm:flex-row items-center justify-between p-4">
                <div className="flex items-center gap-4 w-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-green-600">NPR {item.price}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <Button size="icon" variant="outline" onClick={() => handleDecrease(item._id)}>
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <Button size="icon" variant="outline" onClick={() => handleIncrease(item._id)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => handleRemove(item._id)}>
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

              {/* Payment Method */}
              <div>
                <p className="font-semibold mb-2">Select Payment Method:</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="onCash"
                      checked={paymentMethod === 'onCash'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'onCash')}
                    />
                    On Cash
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="eSewa"
                      checked={paymentMethod === 'eSewa'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'eSewa')}
                    />
                    eSewa
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Khalti"
                      checked={paymentMethod === 'Khalti'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'Khalti')}
                    />
                    Khalti
                  </label>
                </div>
              </div>

              <Button
                className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white mt-2"
                onClick={handleCheckout}
              >
               {paymentMutation.isPending?<Spinner/>:"Proceed to Checkout"} 
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Cart;
