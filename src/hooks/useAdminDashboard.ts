import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
const { adminDashboard } = Endpoints;
import { AxiosError } from "axios";
import { DashboardResponse } from "@/utils/types";

const useAdminDashBoard = async (): Promise<DashboardResponse> => {
  try {
    const response = await axiosInstance.get<DashboardResponse>(adminDashboard);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(
      (err.response?.data as { message?: string })?.message || err.message
    );
  }
};

export const UseAdminDashBoard = () => {
  return useQuery({
    queryKey: ["adminDashboard"],
    queryFn: useAdminDashBoard,
  });
};
