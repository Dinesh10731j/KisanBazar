'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Filter, Search } from 'lucide-react';

const ordersData = [
  { id: 1, customer: 'Ram', product: 'Tomatoes', amount: 'Rs. 200', status: 'Delivered' },
  { id: 2, customer: 'Sita', product: 'Potatoes', amount: 'Rs. 150', status: 'Pending' },
  { id: 3, customer: 'Hari', product: 'Carrots', amount: 'Rs. 100', status: 'Delivered' },
];

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || order.status === filterStatus;
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
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="rounded-2xl shadow-md">
            <CardContent className="p-4">
              <p className="text-lg font-semibold">{order.customer}</p>
              <p className="text-sm text-gray-600">Product: {order.product}</p>
              <p className="text-sm text-gray-600">Amount: {order.amount}</p>
              <p className={`text-sm mt-2 font-medium ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>Status: {order.status}</p>
              <Button className="mt-3 w-full">View Details</Button>
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
