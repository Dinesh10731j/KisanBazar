"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { orderTrendData, categoryDistributionData, keyMetrics } from "@/utils/dummyData";
import { TrendingUp } from "lucide-react";

const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f87171", "#a78bfa"];

const AdminDashboardClient = () => {
  return (
    <div className="p-4 md:p-6 lg:p-10 space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-md">
                <TrendingUp className="text-green-500" size={18} /> {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Orders Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={orderTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#34d399" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Category Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Orders by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistributionData}
                  dataKey="orders"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {categoryDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardClient;
