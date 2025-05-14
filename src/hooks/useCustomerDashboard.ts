import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
const { customerDashboard } = Endpoints;
import { UserDashboardResponse } from "@/utils/types";
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

const fetchDashboardInfo = async (token:string): Promise<UserDashboardResponse> => {
  try {
    const userId = await extractUserId(token)
    const response = await axiosInstance.get<UserDashboardResponse>(`${customerDashboard}/${userId}`);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(
      (err.response?.data as { message?: string })?.message || err.message
    );
  }
};

export const UseUserDashBoardInfo = (userId: string) => {
  return useQuery<UserDashboardResponse, Error>({
    queryKey: ['customerInfo', userId],
    queryFn: () => fetchDashboardInfo(userId)
  });
};
