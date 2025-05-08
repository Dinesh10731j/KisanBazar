import { useQuery } from "@tanstack/react-query";  
import axiosInstance from "@/axiosInstance/axiosInstance";   
import { Endpoints } from "@/api/endpoints";
import { getProductsResponseType } from "@/utils/types";
const {products} = Endpoints

const usegetProducts = async () => {
  try {
    const response = await axiosInstance.get<getProductsResponseType>(products);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

export const UsegetProducts = () => {
    return useQuery<getProductsResponseType,Error,string>({
        queryKey: ["getProducts"],
        queryFn: usegetProducts,
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 5, 
        refetchOnWindowFocus: true,
      refetchOnMount:true,

       
    });
    }