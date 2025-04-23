
'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PackageCheck, Clock, XCircle, Eye,Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { orders } from '@/utils/dummyData'; 
import { Order } from '@/utils/types';

const getStatusBadge = (status: string)=> {
  switch (status) {
    case 'Delivered':
      return <Badge variant={'destructive'} className="flex text-green-300 items-center gap-1"><PackageCheck className="h-4 w-4" /> Delivered</Badge>;
    case 'Pending':
      return <Badge variant={"secondary"} className="flex text-yellow-300 items-center gap-1"><Clock className="h-4 w-4" /> Pending</Badge>;
    case 'Cancelled':
      return <Badge variant={"destructive"} className="flex text-red-500 items-center gap-1"><XCircle className="h-4 w-4" /> Cancelled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const Orders = () => {
  return (
    <div className="p-4 md:p-6 lg:p-10">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <Card>
        <CardContent className="overflow-x-auto p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order:Order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="flex items-center gap-1 cursor-pointer">
                      <Eye className="h-4 w-4" /> View
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="flex items-center  cursor-pointer">
                      <Trash className="h-4 w-4  " color={'red'} /> 
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
