"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usersData } from "@/utils/dummyData";

interface User {
  id: string;
  name: string;
  email: string;
  role: "farmer" | "customer" | "admin";
}

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");

  const filteredUsers = usersData.filter((user): user is User => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" ? true : user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-4 md:p-6 lg:p-10 space-y-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-xl">Manage Users</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Input
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
            <Select value={filterRole} onValueChange={(value) => setFilterRole(value)}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="farmer">Farmer</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user: User) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{user.name}</td>
                    <td className="p-3 border">{user.email}</td>
                    <td className="p-3 border capitalize">{user.role}</td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-3 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUsers;
