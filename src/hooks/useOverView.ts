import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
const { adminOverView } = Endpoints;
import { overViewResponse } from "@/utils/types";
import { AxiosError } from "axios";

const useOverView = async (): Promise<overViewResponse> => {
  try {
    const response = await axiosInstance.get<overViewResponse>(adminOverView);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(
      (err.response?.data as { message?: string })?.message || err.message
    );
  }
};

export const UseAdminOverView = () => {
  return useQuery({
    queryKey: ["adminoverview"],
    queryFn: useOverView,
  });
};
