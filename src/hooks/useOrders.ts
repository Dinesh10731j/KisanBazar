import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
const { adminOrders } = Endpoints;
import { AxiosError } from "axios";
import { OrdersResponse } from "@/utils/types";
const fetchOrders = async (): Promise<OrdersResponse> => {
  try {
    const response = await axiosInstance.get<OrdersResponse>(adminOrders);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(
      (err.response?.data as { message?: string })?.message || err.message
    );
  }
};

export const UseOrders = () => {
  return useQuery<OrdersResponse, Error>({
    queryKey: ["Orders"],
    queryFn: fetchOrders,
  });
};
