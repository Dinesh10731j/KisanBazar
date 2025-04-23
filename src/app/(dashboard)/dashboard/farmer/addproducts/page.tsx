'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { productSchema,ProductFormValues } from '@/zod_schema/schema';
import Image from 'next/image';
const AddProducts = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: '',
      quantity: '',
      description: '',
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    const file = data.image[0];
    console.log('Product added:', {
      ...data,
      imageFileName: file.name,
    });


  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="shadow-md">
          <CardContent className="space-y-4 p-6">
            <div>
              <Label>Product Name</Label>
              <Input {...form.register('name')} placeholder="e.g. Organic Tomatoes" />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Price</Label>
                <Input {...form.register('price')} placeholder="e.g. 250" />
                {form.formState.errors.price && (
                  <p className="text-red-500 text-sm">{form.formState.errors.price.message}</p>
                )}
              </div>
              <div>
                <Label>Quantity</Label>
                <Input {...form.register('quantity')} placeholder="e.g. 10kg" />
                {form.formState.errors.quantity && (
                  <p className="text-red-500 text-sm">{form.formState.errors.quantity.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea {...form.register('description')} placeholder="Optional product description..." />
            </div>

            <div>
              <Label>Product Image</Label>
              <Input
                type="file"
                accept="image/*"
                {...form.register('image')}
                onChange={(e) => {
                  form.setValue('image', e.target.files);
                  handleImageChange(e);
                }}
              />
              {form.formState.errors.image && (
                <p className="text-red-500 text-sm">{String(form.formState.errors.image?.message)}</p>
              )}
              {imagePreview && (
                <Image src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
              )}
            </div>

            <Button type="submit" className="w-full mt-4">Add Product</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default AddProducts;
