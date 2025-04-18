import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "@/api/endpoints";
import { SignupFormValues } from "@/utils/types";
import axiosInstance from "@/axiosInstance/axiosInstance";
import Cookies from "js-cookie";
import { SignupResponse } from "@/utils/types";
const { signup } = Endpoints;

const userSignup = async (data: SignupFormValues): Promise<SignupResponse> => {
  try {
    const response = await axiosInstance.post<SignupResponse>(signup, data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Something went wrong");
  }
};

export const UseUserSignup = () => {
  return useMutation<SignupResponse, Error, SignupFormValues>({
    mutationKey: ["userSignup"],
    mutationFn: userSignup,
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
