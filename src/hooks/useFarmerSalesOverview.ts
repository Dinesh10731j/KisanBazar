import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
const { farmerSalesOverview } = Endpoints;
import { useQuery } from "@tanstack/react-query";
import { SalesOverview } from "@/utils/types";
import { AxiosError } from "axios";
const salesOverView = async (): Promise<SalesOverview> => {
  try {
    const response = await axiosInstance.get<SalesOverview>(
      farmerSalesOverview
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(
      (err.response?.data as { message?: string })?.message || err.message
    );
  }
};

export const UseSalesOverView = () => {
  return useQuery<SalesOverview, Error>({
    queryKey: ["salesOverview"],
    queryFn: salesOverView,
  });
};
