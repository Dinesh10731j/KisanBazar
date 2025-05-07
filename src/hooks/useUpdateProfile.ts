import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
const { updateProfile } = Endpoints;
import { updateProfileFormValues, updateProfileResponse } from "@/utils/types";
const useUpdateProfile = async (
  data: updateProfileFormValues
): Promise<updateProfileResponse> => {
  try {
    const response = await axiosInstance.put<updateProfileResponse>(
      updateProfile,
      data
    );

    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile");
  }
};

export const UseUserUpdateProfile = () => {
  return useMutation<updateProfileResponse, Error, updateProfileFormValues>({
    mutationFn: useUpdateProfile,
    mutationKey: ["updateProfile"],
    onSuccess: (data) => {
      console.log("Profile updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });
};
