import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "@/api/endpoints";
const { signup } = Endpoints;
import { SignupFormValues } from "@/utils/types";
import axiosInstance from "@/axiosInstance/axiosInstance";

const userSignup = async (data: SignupFormValues) => {
  try {
    const response = await axiosInstance.post(signup, data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
};

export const UseUserSignup = () => {
  return useMutation({
    mutationKey: ["userSignup"],
    mutationFn: userSignup,
  });
};
