
'use client';
import React from 'react';
import { addToCart } from '@/lib/store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { products } from '@/utils/dummyData';
import { Product } from '@/utils/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';


const Shop: React.FC = () => {
  const dispatch = useDispatch();
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    alert(`Product added to cart successfully ${product.product_Name}`);
  };



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Shop Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-md p-4">
            <Image
              src={product.product_Image}
              alt={product.product_Name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800">{product.product_Name}</h2>
            <p className="text-green-600">NPR.{product.product_Price}</p>
            <Button
              variant={'ghost'}
              onClick={() => handleAddToCart(product)}
              className="mt-4 w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
