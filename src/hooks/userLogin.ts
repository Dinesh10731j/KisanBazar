import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import { LoginFormValues } from "@/utils/types";
const {login} = Endpoints;



const useLogin = async (data:LoginFormValues)=>{
    const response = await axiosInstance.post(login, data);
    return response.data;
}


export const UseUserLogin = ()=>{
    return useMutation ({
        mutationKey:['login'],
        mutationFn:useLogin,
        
    })
}