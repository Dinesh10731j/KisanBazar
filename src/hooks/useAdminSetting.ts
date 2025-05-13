import { useMutation} from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import {jwtVerify} from "jose"
const {adminSetting} = Endpoints;
import { AxiosError } from "axios";
import { SettingsFormData } from "@/zod_schema/schema";

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


export const updateSetting = async (token:string,data:SettingsFormData):Promise<{message:string}>=>{
    try{

        const userId = await extractUserId(token);
        const response = await axiosInstance.put<{message:string}>(`${adminSetting}/${userId}`,data);
        return response.data


    }catch(error){
        const err = error as AxiosError;
    throw new Error(
      (err.response?.data as { message?: string })?.message || err.message
    );

    }
}


export const UseAdminSetting = ()=>{
  return useMutation<{message:string}, Error, { token: string; data: SettingsFormData }>({
        mutationKey: ["adminSetting"],
        mutationFn: ({ token, data }) => updateSetting(token, data),
    });
}