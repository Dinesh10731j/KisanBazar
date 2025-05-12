"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  categoryDistributionData,
} from "@/utils/dummyData";
import { UseAdminOverView } from "@/hooks/useOverView";
import Spinner from "@/app/components/Loader";

const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f87171", "#a78bfa"];

const OverView = () => {

  const { data: overView, isLoading, isError } = UseAdminOverView();

  if (isLoading || !overView) return <div className="flex flex-col items-center justify-center h-screen"><Spinner /></div>
  if (isError) return <div className="flex flex-col text-red-500 items-center justify-center h-screen">Error fetching data</div>

  return (
    <div className="p-4 md:p-6 lg:p-10 grid gap-6 md:grid-cols-2">
      {/* Total Orders */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="text-green-500" /> Total Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{overView?.totalOrders}</p>
          <p className="text-sm text-muted-foreground">{overView?.percentChange} from last week</p>
        </CardContent>
      </Card>

      {/* Orders Trend - Line Chart */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Orders Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={overView?.ordersOverTime} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orderCount" stroke="#34d399" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Orders by Category - Pie Chart */}
      <Card className="col-span-1 md:col-span-2">
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
                  fill="#8884d8"
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

export default OverView;