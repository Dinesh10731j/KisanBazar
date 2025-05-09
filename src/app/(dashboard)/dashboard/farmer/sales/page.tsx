'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Filter } from 'lucide-react';
import { UseSalesOverView } from '@/hooks/useFarmerSalesOverview';
import { SalesOverviewResponse } from '@/utils/types';

const Sales = () => {
  const {data:salesData=[],} = UseSalesOverView();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterAmount, setFilterAmount] = useState('');


  const filteredSales = salesData.filter((sale:SalesOverviewResponse) => {
    const matchesSearch = sale.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAmount = filterAmount ? sale.totalPrice >= parseInt(filterAmount) : true;
    return matchesSearch && matchesAmount;
  });


  console.log("This is filtereData",filteredSales);
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Filter className="w-6 h-6 text-green-600" /> Sales History
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 w-full">
          <Search className="text-gray-500" />
          <Input
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full">
          <Filter className="text-gray-500" />
          <Input
            type="number"
            placeholder="Minimum sale amount"
            value={filterAmount}
            onChange={(e) => setFilterAmount(e.target.value)}
          />
        </div>
      </div>

      <Card className="shadow-md mb-8">
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity Sold</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale:SalesOverviewResponse) => (
                <TableRow key={sale._id}>
                  <TableCell>{sale.productName}</TableCell>
                  <TableCell>{sale.totalQuantity}kg</TableCell>
                  <TableCell>NPR {sale.totalPrice}</TableCell>
                  <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
      <Card className="shadow-md">
        <CardContent className="p-4 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredSales}>
              <XAxis dataKey="productName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalPrice" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;
