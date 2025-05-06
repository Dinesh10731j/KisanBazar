import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { getProductsResponseType } from "@/utils/types";
import { Endpoints } from "@/api/endpoints";
const { getProducts } = Endpoints;

const useGetProducts = async (): Promise<getProductsResponseType> => {
  try {
    const response = await axiosInstance.get<getProductsResponseType>(getProducts);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch products");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const UsegetUserProducts = () => {
  return useQuery<getProductsResponseType,Error>({
    queryKey: ["getProducts"],
    queryFn: useGetProducts,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    refetchIntervalInBackground: true,
    retry: 1,
    retryDelay: 1000,
    staleTime: 1000 * 60 * 5,
  });
};
