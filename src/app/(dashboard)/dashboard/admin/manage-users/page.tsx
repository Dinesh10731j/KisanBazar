"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UseAdminManageUsers } from "@/hooks/useManageUsers";
import { User } from "@/utils/types";
import { Trash2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Spinner from "@/app/components/Loader";
import { useChangeUserRole } from "@/hooks/useChangeRole";
import { useRemoveUsers } from "@/hooks/useRemoveUsers";
import { useDispatch } from "react-redux";
import { addToast } from "@/lib/store/slices/toastSlice";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, refetch } = UseAdminManageUsers();
  const { mutate: changeRole } = useChangeUserRole();
  const { mutate: removeUser } = useRemoveUsers();

  const users = data?.users || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [editUser, setEditUser] = useState<User | null>(null);

  if (isLoading || !data)
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <div className="text-red-500 bg-red-100 p-3 rounded-md">
        Failed to load users. Please try again later.
      </div>
    );

  const filteredUsers = users.filter((user: User) => {
    const matchesSearch =
      user?.username?.toLowerCase?.().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase?.().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" ? true : user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleDelete = async (id: string) => {
    removeUser(id, {
      onSuccess: () => {
        dispatch(addToast({ type: "success", message: "User deleted successfully" }));
        refetch();
      },
      onError: (error: Error) => {
        dispatch(addToast({ type: "error", message: error.message }));
      },
    });
  };

  const handleRoleChange = async (newRole: "admin" | "farmer" | "user") => {
    if (!editUser) return;

    changeRole(
      { id: editUser._id, role: newRole },
      {
        onSuccess: () => {
          dispatch(addToast({ type: "success", message: "Role updated successfully" }));
          refetch();
          setEditUser(null);
        },
        onError: (error: Error) => {
          dispatch(addToast({ type: "error", message: error.message }));
        },
      }
    );
  };

  return (
    <div className="px-4 py-4 md:px-6 lg:px-10 max-w-full overflow-hidden">
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
            <Select
              value={filterRole}
              onValueChange={(value) => setFilterRole(value)}
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="farmer">Farmer</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <div className="min-w-[200px] md:min-w-full">
            <table className="w-full text-sm text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Role</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="p-3 border">{user.username}</td>
                    <td className="p-3 border">{user.email}</td>
                    <td className="p-3 border capitalize">{user.role}</td>
                    <td className="p-3 border space-x-2 flex items-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="cursor-pointer bg-blue-400 text-white"
                            size="icon"
                            onClick={() => setEditUser(user)}
                          >
                            <Pencil size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-black/30 backdrop-blur-md text-white rounded-2xl shadow-2xl p-6 z-[9999]">
                          <DialogHeader>
                            <DialogTitle>Change Role</DialogTitle>
                          </DialogHeader>
                          <Select
                            defaultValue={user.role}
                            onValueChange={handleRoleChange}
                          >
                            <SelectTrigger className="mt-4">
                              <SelectValue placeholder="Select new role" />
                            </SelectTrigger>
                            <SelectContent className="bg-white/90 backdrop-blur-sm z-[9999]">
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="farmer">Farmer</SelectItem>
                              <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                          </Select>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="destructive"
                        className="bg-red-500 cursor-pointer"
                        size="icon"
                        onClick={() => handleDelete(user._id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-3 text-center text-gray-500">
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
