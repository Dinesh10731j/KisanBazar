'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PackageCheck, Clock, XCircle } from 'lucide-react';
import { UseCustomerOrderDetails } from '@/hooks/useOrderDetails';
import { useAccessToken } from '@/hooks/useAccessToken';
import { Input } from '@/components/ui/input';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Success':
      return (
        <Badge variant={'destructive'} className="flex text-green-300 items-center gap-1">
          <PackageCheck className="h-4 w-4" /> Delivered
        </Badge>
      );
    case 'Pending':
      return (
        <Badge variant={'secondary'} className="flex text-yellow-300 items-center gap-1">
          <Clock className="h-4 w-4" /> Pending
        </Badge>
      );
    case 'Cancelled':
      return (
        <Badge variant={'destructive'} className="flex text-red-500 items-center gap-1">
          <XCircle className="h-4 w-4" /> Cancelled
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};

const Orders = () => {
  const token = useAccessToken();
  const { data: order, isLoading, isError } = UseCustomerOrderDetails(token || '');
  const [searchTerm, setSearchTerm] = useState('');

  const orders = order?.data || [];

  const filteredOrders = orders.filter((order) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return (
      order.orderId?.toLowerCase().includes(lowercasedSearchTerm) ||
      order.status.toLowerCase().includes(lowercasedSearchTerm)
    );
  });

  if (isLoading || !order) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders</div>;

  return (
    <div className="p-4 md:p-6 lg:p-10">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by Order ID or Status"
          className="w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="overflow-x-auto p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <React.Fragment key={order.orderId}>
                    <TableRow>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>NPR {order.amount}</TableCell>
                      <TableCell>{order.paymentMethod}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5} className="bg-gray-50 p-2">
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-sm">
                            <thead>
                              <tr className="text-left border-b border-gray-300">
                                <th className="p-2">Product</th>
                                <th className="p-2">Quantity</th>
                                <th className="p-2">Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.products.map((product, index) => (
                                <tr key={index} className="border-b border-gray-100">
                                  <td className="p-2">{product.name}</td>
                                  <td className="p-2">{product.quantity}</td>
                                  <td className="p-2">NPR {product.price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
