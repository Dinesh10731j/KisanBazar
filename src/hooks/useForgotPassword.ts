import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";

const { forgotPassword: forgotPasswordEndpoint } = Endpoints;
const forgotPassword = async (email: string): Promise<{ message: string }> => {
    try {
        const response = await axiosInstance.post<{ message: string }>(forgotPasswordEndpoint, { email });
        return response.data;

    } catch (error) {
        const err = error as AxiosError;
        throw new Error(
            (err.response?.data as { message?: string })?.message || err.message
        );
    }
}


export const useForgotPassword = () => {
    return useMutation<{ message: string }, Error, string>({
        mutationKey: ["forgotPassword"],
        mutationFn: (email) => forgotPassword(email),
    });
}