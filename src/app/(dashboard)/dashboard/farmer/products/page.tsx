'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Trash, Edit } from 'lucide-react';
import { UsegetUserProducts } from '@/hooks/usegetProducts';
import { getProductsResponse } from '@/utils/types';
import Image from 'next/image';
import { UseDeleteProduct } from '@/hooks/useDeleteproduct';
import { useDispatch } from 'react-redux';
import { addToast } from '@/lib/store/slices/toastSlice';
import { UseUserUpdateProduct } from '@/hooks/useUpdateProducts';

const Products = () => {
  const dispatch = useDispatch();
  const updateProductMutation = UseUserUpdateProduct();
  const { data: products = [], isLoading, isError } = UsegetUserProducts();
  const deleteProductMutation = UseDeleteProduct();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<getProductsResponse | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    description: '',
  });

  const filteredProducts = products?.filter((product: getProductsResponse) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (product: getProductsResponse) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      description:product.description ?? '',
      
    });
  };

  const handleDelete = (productId: string) => {
  deleteProductMutation.mutate(productId, {
    onSuccess: () => {
      dispatch(addToast({ message: 'Product deleted successfully', type: 'success' }));
    },
    onError: (error) => {
    dispatch(addToast({ message: error.message, type: 'error' }));
    },
  });
 
  };

  const handleSave = () => {
    const { name, price, quantity } = formData;
  
    if (!name || !price || !quantity) {
      dispatch(addToast({ message: 'Please fill out all fields before saving.', type: 'error' }));
      return;
    }
  
    if (!editingProduct?._id) {
      dispatch(addToast({ message: 'No product selected for editing.', type: 'error' }));
      return;
    }
  
    // Convert plain object to FormData
    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('price', price);
    formDataToSend.append('quantity', quantity);
    if (formData.description) formDataToSend.append('description', formData.description);
  
    updateProductMutation.mutate(
      {
        formData: formDataToSend,
        productId: editingProduct._id,
      },
      {
        onSuccess: () => {
          dispatch(addToast({ message: 'Product updated successfully', type: 'success' }));
          setEditingProduct(null);
        },
        onError: (error) => {
          dispatch(addToast({ message: error.message, type: 'error' }));
        },
      }
    );
  };
  
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
            filteredProducts.map((product: getProductsResponse) =>
              editingProduct && editingProduct._id === product._id ? (
                <Card key={product._id} className="rounded-2xl shadow-md overflow-hidden p-4">
                  <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
                  <Input
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mb-2"
                  />
                  <Input
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="mb-2"
                  />
                  <Input
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="mb-4"
                  />
                    <Input
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="mb-4"
                  />
                  <div className="flex gap-2">
                    <Button className="bg-blue-500 cursor-pointer" onClick={handleSave}>Save</Button>
                    <Button className='cursor-pointer bg-red-500' onClick={() => setEditingProduct(null)}>Cancel</Button>
                  </div>
                </Card>
              ) : (
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
                    <p className="text-sm text-gray-600">Price: {product.price.startsWith('NRS')?product.price:`NRS ${product.price}`}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {`${product.quantity}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      Description: {product.description ?? 'No description available'}
                    </p>
                    <div className="flex flex-col justify-between items-center mt-4 gap-2">
                      <Button
                        variant="outline"
                        className="w-full flex items-center gap-2 bg-green-300 cursor-pointer"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-full flex items-center gap-2 bg-red-500 cursor-pointer"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Trash className="w-4 h-4" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            )
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
