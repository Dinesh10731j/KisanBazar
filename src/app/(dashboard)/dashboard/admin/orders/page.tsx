'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Filter, Search } from 'lucide-react';
import { UseOrders } from '@/hooks/useOrders';
import Image from 'next/image';
const getRandomColor = () =>Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

const Orders = () => {
  const { data: ordersData = [],isLoading,isError } = UseOrders();
  const randomColor = getRandomColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  if(isLoading || !ordersData) return <div className='flex flex-col justify-center items-center h-screen'></div>
  if (isError)
    return (
      <div className="text-red-500 bg-red-100 p-3 rounded-md">
        Failed to load users. Please try again later.
      </div>
    );

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = order.buyerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || order.paymentStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="w-5 h-5 text-gray-500" />
          <Input
            placeholder="Search by customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Success">Success</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredOrders.map((order, index) => (
          <Card key={index} className="rounded-2xl shadow-md">
            <CardContent className="p-4 space-y-4">
              <div>
                <p className="text-lg font-semibold">{order.buyerName}</p>
                <p className="text-sm text-gray-600">Total Amount: NPR {order.totalAmount}</p>
                <p className={`text-sm font-medium ${order.paymentStatus === 'Success' ? 'text-green-600' : 'text-yellow-600'}`}>
                  Status: {order.paymentStatus}
                </p>
              </div>

              <div className="space-y-3">
                {order.products.map((product, pIndex) => (
                  <div key={pIndex} className="flex gap-3 items-start border p-2 rounded-md bg-gray-50">
                    <Image
                    height={80}
                    width={80}
                      src={product.imageUrl || `https://avatar.iran.liara.run/username?username=${product.productName}&background=${randomColor}`}
                      alt={product.productName}
                      className="w-16 h-16 rounded-md object-cover border"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{product.productName}</p>
                      <p className="text-sm text-gray-600">Farmer: {product.farmerName}</p>
                      <p className="text-sm text-gray-800">Amount: NPR {product.amount}</p>
                    </div>
                  </div>
                ))}
              </div>


            </CardContent>
          </Card>
        ))}

        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
