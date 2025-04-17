import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import { LoginFormValues } from "@/utils/types";
import { LoginResponse } from "@/utils/types";
import Cookies from "js-cookie";
const { login } = Endpoints;

const useLogin = async (data: LoginFormValues): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(login, data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Something went wrong");
  }
};

export const UseUserLogin = () => {
  return useMutation<LoginResponse, Error, LoginFormValues>({
    mutationKey: ["login"],
    mutationFn: useLogin,
    onSuccess: (data) => {
      try {
        Cookies.set("access_token", data.access_token, {
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("refresh_token", data.refresh_token, {
          secure: true,
          sameSite: "Strict",
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error("Token saving error:", error.message);
        } else {
          console.error("Unknown error occurred while saving tokens.");
        }
      }
    },
  });
};
