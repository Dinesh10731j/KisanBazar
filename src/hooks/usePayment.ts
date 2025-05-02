import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
const {payment} = Endpoints
import { PaymentResponse } from "@/utils/types";
import { PaymentFormValues } from "@/utils/types";

const usePayment = async (data: PaymentFormValues): Promise<PaymentResponse> => {
    try {
        const response = await axiosInstance.post<PaymentResponse>(payment, data);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
        throw new Error(error.message);
        }
        throw new Error("Something went wrong");
    }
    }


    export const UseUserPayment = () => {
        return useMutation<PaymentResponse, Error, PaymentFormValues>({
            mutationKey: ['payment'],
            mutationFn: usePayment
        })
    }