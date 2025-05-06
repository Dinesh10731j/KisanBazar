import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "@/api/endpoints";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { deleteProductResponse } from "@/utils/types";

const useDeleteProduct = async (productId: string): Promise<deleteProductResponse> => {
    try{
const response = await axiosInstance.delete<deleteProductResponse>(`${Endpoints.deleteProduct}/${productId}`);
return response.data;
    }catch(error){
        if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("Something went wrong");
    }

}


export const UseDeleteProduct = () => {
    return useMutation<deleteProductResponse, Error, string>({
        mutationKey: ["deleteProduct"],
        mutationFn: useDeleteProduct,
    });
}