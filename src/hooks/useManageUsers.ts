import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { AxiosError } from "axios";
import { UsersResponse as manageUsersResponse } from "@/utils/types";
import { Endpoints } from "@/api/endpoints";
const { adminManageUsers } = Endpoints;

const useAdminManageUsers = async (): Promise<manageUsersResponse> => {
  try {
    const response = await axiosInstance.get<manageUsersResponse>(
      adminManageUsers
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(
      (err.response?.data as { message?: string })?.message || err.message
    );
  }
};

export const UseAdminManageUsers = () => {
  return useQuery<manageUsersResponse, Error>({
    queryKey: ["manageUsers"],
    queryFn: useAdminManageUsers,
  });
};
