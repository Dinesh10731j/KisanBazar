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
import { Search, Filter, PackageCheck, PackagePlus, PackageX } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { salesData ,salesProducts,statusData,COLORS} from '@/utils/dummyData';

const FarmerDashboardClient = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredProducts = salesProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Farmer Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <PackageCheck className="text-green-600" />
            <div>
              <p className="text-gray-500">Total Products</p>
              <p className="text-xl font-bold">{salesProducts.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <PackagePlus className="text-blue-600" />
            <div>
              <p className="text-gray-500">Total Sales</p>
              <p className="text-xl font-bold">Rs. 12,500</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <PackageX className="text-yellow-600" />
            <div>
              <p className="text-gray-500">Pending Orders</p>
              <p className="text-xl font-bold">4</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <Card className="p-4 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Product Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" label outerRadius={60} fill="#8884d8" dataKey="value">
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="w-5 h-5 text-gray-500" />
          <Input
            placeholder="Search by product name..."
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
              <SelectItem value="Listed">Listed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">My Products</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="rounded-2xl shadow-md">
            <CardContent className="p-4">
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-sm text-gray-600">Price: {product.price}</p>
              <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
              <p className={`text-sm mt-2 font-medium ${product.status === 'Listed' ? 'text-green-600' : 'text-yellow-600'}`}>Status: {product.status}</p>
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

export default FarmerDashboardClient;