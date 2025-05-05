import { useMutation } from "@tanstack/react-query";
import { addProductReponse } from "@/utils/types";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
const { addProduct } = Endpoints;
const useAddProducts = async (formData: FormData): Promise<addProductReponse> => {
  try {
    const response = await axiosInstance.post<addProductReponse>(addProduct, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Something went wrong");
  }
};

export const UseUserAddProducts = () => {
  return useMutation<addProductReponse, Error, FormData>({
    mutationKey: ["addproducts"],
    mutationFn: useAddProducts,
  });
};
