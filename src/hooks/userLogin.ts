import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
import { LoginFormValues } from "@/utils/types";
const {login} = Endpoints;



const useLogin = async (data:LoginFormValues)=>{

    try{
        const response = await axiosInstance.post(login, data);
        return response.data;
    }catch(error:unknown){
        if(error instanceof Error){
            throw new Error(error.message);
        }else{
            throw new Error("Something went wrong");
        }
  
}
}

export const UseUserLogin = ()=>{
    return useMutation ({
        mutationKey:['login'],
        mutationFn:useLogin,
        
    })
}