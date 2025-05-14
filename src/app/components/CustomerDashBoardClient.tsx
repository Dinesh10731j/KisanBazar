'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBasket, Package, BarChart } from 'lucide-react';
import { UseUserDashBoardInfo } from '@/hooks/useCustomerDashboard';
import { useAccessToken } from '@/hooks/useAccessToken';
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

const COLORS = ['#16a34a', '#facc15', '#f97316', '#60a5fa'];
import Spinner from './Loader';

const CustomerDashboard = () => {
  const token = useAccessToken();
  const { data, isLoading, isError } = UseUserDashBoardInfo(token || "");

  if (isLoading) return <div className='flex flex-col justify-center items-center h-screen'><Spinner/></div>;
  if (isError || !data) return  <div className="text-red-500 bg-red-100 p-3 rounded-md">
        Failed to load users. Please try again later.
      </div>;

  const {
    totalOrders,
    totalSpent,
    lastOrderDate,
    productCategoryCount,
    orderMonthlyCount,
  } = data;

  const categoryData = Object.entries(productCategoryCount).map(([name, value]) => ({
    name,
    value,
  }));

  const orderTrendData = Object.entries(orderMonthlyCount).map(([month, orders]) => ({
    month,
    orders,
  }));

  return (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-green-700">My Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-green-100">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-lg font-medium">Total Orders</h2>
              <p className="text-2xl font-bold text-green-700">{totalOrders}</p>
            </div>
            <ShoppingBasket className="w-10 h-10 text-green-600" />
          </CardContent>
        </Card>

        <Card className="bg-yellow-100">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-lg font-medium">Total Spent</h2>
              <p className="text-2xl font-bold text-yellow-700">NPR {totalSpent}</p>
            </div>
            <BarChart className="w-10 h-10 text-yellow-600" />
          </CardContent>
        </Card>

        <Card className="bg-blue-100">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-lg font-medium">Last Order</h2>
              <p className="text-2xl font-bold text-blue-700">
                {new Date(lastOrderDate).toLocaleDateString()}
              </p>
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
