'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBasket, Package, BarChart } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts';

const orderSummary = {
  totalOrders: 14,
  totalSpent: 'NPR 6,540',
  lastOrderDate: '2025-04-15',
};

const categoryData = [
  { name: 'Grains', value: 5 },
  { name: 'Dairy', value: 3 },
  { name: 'Vegetables', value: 4 },
  { name: 'Fruits', value: 2 },
];

const orderTrendData = [
  { month: 'Jan', orders: 2 },
  { month: 'Feb', orders: 1 },
  { month: 'Mar', orders: 3 },
  { month: 'Apr', orders: 4 },
  { month: 'May', orders: 2 },
  { month: 'Jun', orders: 2 },
];

const COLORS = ['#16a34a', '#facc15', '#f97316', '#60a5fa'];

const CustomerDashboard = () => {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-green-700">My Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-green-100">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-lg font-medium">Total Orders</h2>
              <p className="text-2xl font-bold text-green-700">{orderSummary.totalOrders}</p>
            </div>
            <ShoppingBasket className="w-10 h-10 text-green-600" />
          </CardContent>
        </Card>

        <Card className="bg-yellow-100">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-lg font-medium">Total Spent</h2>
              <p className="text-2xl font-bold text-yellow-700">{orderSummary.totalSpent}</p>
            </div>
            <BarChart className="w-10 h-10 text-yellow-600" />
          </CardContent>
        </Card>

        <Card className="bg-blue-100">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-lg font-medium">Last Order</h2>
              <p className="text-2xl font-bold text-blue-700">{orderSummary.lastOrderDate}</p>
            </div>
            <Package className="w-10 h-10 text-blue-600" />
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart for Category */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Order Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Line Chart for Order Movement */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Order Movement Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={orderTrendData}>
              <Line type="monotone" dataKey="orders" stroke="#16a34a" strokeWidth={3} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDashboard;
