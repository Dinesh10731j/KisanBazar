'use client';
import React, { useState } from 'react';
import { addToCart } from '@/lib/store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { getProductsResponse } from '@/utils/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UsegetProducts } from '@/hooks/useGetAllProducts';
import Spinner from '@/app/components/Loader';
import { addToast } from '@/lib/store/slices/toastSlice';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const Shop: React.FC = () => {
  const { data: products = [], isLoading, isError } = UsegetProducts();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<string>('');

  const handleAddToCart = (product: getProductsResponse) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    dispatch(addToast({ message: `${product.name} added to cart`, type: 'success' }));
  };

  const filteredProducts = products
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return Number(a.price) - Number(b.price);
      if (sortOrder === 'desc') return Number(b.price) - Number(a.price);
      return 0;
    });

  if (isLoading && !products)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <div className="text-red-500 bg-red-100 p-3 rounded-md">
        Failed to load products. Please try again later.
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Shop Products</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/2"
        />

        <Select onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue placeholder="Sort by price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Price: Low to High</SelectItem>
            <SelectItem value="desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products */}
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {filteredProducts.map((product) => (
    <Card key={product._id} className="rounded-xl shadow-sm">
      <CardHeader>
        <Image
          width={400}
          height={200}
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 object-cover rounded-md"
        />
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {product.description || 'No description available.'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-green-600 font-semibold">NPR {product.price}</p>
      </CardContent>

      <CardFooter>
        <Button
          variant="default"
          onClick={() => handleAddToCart(product)}
          className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  ))}
</div>

    </div>
  );
};

export default Shop;
