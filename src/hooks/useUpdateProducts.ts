import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
const {updateProduct} = Endpoints
import { updateProductResponse } from "@/utils/types";

const UseUpdateProduct = async (formData: FormData, productId: string): Promise<updateProductResponse> => {
  try {
    const response = await axiosInstance.put<updateProductResponse>(`${updateProduct}/${productId}`, formData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Something went wrong");
  }
};


export const UseUserUpdateProduct = () => {
  return useMutation<updateProductResponse, Error, { formData: FormData; productId: string }>({
    mutationKey: ["updateProduct"],
    mutationFn: ({ formData, productId }) => UseUpdateProduct(formData, productId),
  });
};

