import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
const { customerOrderDetails} = Endpoints;
import {OrderDetailsResponse} from "@/utils/types";
import { AxiosError } from "axios";
import { jwtVerify } from "jose";

const extractUserId = async (token: string) => {
    try {
        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET); 
        const { payload } = await jwtVerify(token, secret);

        return payload.userId as string; 
    } catch (error) {
        console.error(error);
        throw new Error("Invalid or expired token");
    }
};

const fetchCustomerOrderDeatils = async (token:string): Promise<OrderDetailsResponse> => {
  try {
    const userId = await extractUserId(token)
    const response = await axiosInstance.get<OrderDetailsResponse>(`${customerOrderDetails}/${userId}`);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(
      (err.response?.data as { message?: string })?.message || err.message
    );
  }
};

export const UseCustomerOrderDetails = (userId: string) => {
  return useQuery<OrderDetailsResponse, Error>({
    queryKey: ['customerOrderDetails', userId],
    queryFn: () => fetchCustomerOrderDeatils(userId)
  });
};
