'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';
import { UsegetUserProducts } from '@/hooks/usegetProducts';
import { getProductsResponse } from '@/utils/types';
import Image from 'next/image';

const Products = () => {
  const { data: products = [], isLoading, isError } = UsegetUserProducts();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products?.filter((product: getProductsResponse) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Products</h1>

      <div className="flex items-center gap-2 mb-6">
        <Search className="w-5 h-5 text-gray-500" />
        <Input
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64"
        />
      </div>

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="rounded-2xl shadow-md overflow-hidden">
              <Skeleton className="h-40 w-full bg-gray-400" />
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4 bg-gray-300" />
                <Skeleton className="h-4 w-1/2 bg-gray-300" />
                <Skeleton className="h-4 w-1/3 bg-gray-300" />
                <Skeleton className="h-8 w-full mt-3 bg-gray-300" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isError && (
        <p className="text-center text-red-500">Failed to load products. Please try again.</p>
      )}

      {!isLoading && !isError && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: getProductsResponse) => (
              <Card key={product._id} className="rounded-2xl shadow-md overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={500}
                  height={300}
                  className="h-40 w-full object-cover"
                />
                <CardContent className="p-4">
                  <p className="text-lg font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-600">Price: {product.price}</p>
                  <p className="text-sm text-gray-600"> Quantity: {product.quantity.toLowerCase().endsWith('kg') ? product.quantity : `${product.quantity}kg`}</p>
                  <Button className="mt-3 w-full cursor-pointer">Edit Product</Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
