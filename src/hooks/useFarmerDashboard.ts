import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "@/api/endpoints";
const { farmerDashboard } = Endpoints;
import axiosInstance from "@/axiosInstance/axiosInstance";
import { AxiosError } from "axios";

const useFramerDashBoard = async () => {
  try {
    const response = await axiosInstance.get(farmerDashboard);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(
      (err.response?.data as { message?: string })?.message || err.message
    );
  }
};

export const UseFarmerDashBoard = () => {
  return useQuery({
    queryKey: ["farmerDashboard"],
    queryFn: useFramerDashBoard,
  });
};
