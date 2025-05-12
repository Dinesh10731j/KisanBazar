import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
const {adminRemoverUsers} = Endpoints
import { AxiosError } from "axios";
const removeUser = async (id: string): Promise<void> => {
    try {
        const response = await axiosInstance.delete(`${adminRemoverUsers}/${id}`);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
    throw new Error(
      (err.response?.data as { message?: string })?.message || err.message
    );
    }
};

export const useRemoveUsers = () => {
    return useMutation<void, Error, string>({
        mutationKey: ['removeUsers'],
        mutationFn: (id: string) => removeUser(id),
    });
};       
    
