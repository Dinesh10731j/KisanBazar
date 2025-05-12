import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import { AxiosError } from "axios";

const { adminChangeRole } = Endpoints;

type ChangeRolePayload = {
  id: string;
  role: "admin" | "farmer" | "user";
};

const changeUserRole = async ({ id, role }: ChangeRolePayload): Promise<void> => {
  try {
    const response = await axiosInstance.patch(`${adminChangeRole}/${id}`, { role });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(
      (err.response?.data as { message?: string })?.message || err.message
    );
  }
};

export const useChangeUserRole = () => {
  return useMutation<void, Error, ChangeRolePayload>({
    mutationKey: ["changeUserRole"],
    mutationFn: changeUserRole,
  });
};
