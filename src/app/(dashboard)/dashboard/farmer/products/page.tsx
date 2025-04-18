'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { sampleProducts } from '@/utils/dummyData';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = sampleProducts.filter((product) =>
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="rounded-2xl shadow-md">
            <CardContent className="p-4">
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-sm text-gray-600">Price: {product.price}</p>
              <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
              <Button className="mt-3 w-full">Edit Product</Button>
            </CardContent>
          </Card>
        ))}

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
