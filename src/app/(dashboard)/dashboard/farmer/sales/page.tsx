'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Filter } from 'lucide-react';

const mockSalesData = [
  {
    id: 1,
    product: 'Organic Tomatoes',
    quantity: '10kg',
    amount: 2500,
    date: '2025-04-15',
  },
  {
    id: 2,
    product: 'Red Onions',
    quantity: '5kg',
    amount: 1000,
    date: '2025-04-14',
  },
  {
    id: 3,
    product: 'Fresh Apples',
    quantity: '7kg',
    amount: 2100,
    date: '2025-04-10',
  },
];

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAmount, setFilterAmount] = useState('');

  const filteredSales = mockSalesData.filter((sale) => {
    const matchesSearch = sale.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAmount = filterAmount ? sale.amount >= parseInt(filterAmount) : true;
    return matchesSearch && matchesAmount;
  });

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
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.product}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>NPR {sale.amount}</TableCell>
                  <TableCell>{sale.date}</TableCell>
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
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;
