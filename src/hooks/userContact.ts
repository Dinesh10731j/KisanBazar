import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
const {contact} = Endpoints
import {useMutation} from "@tanstack/react-query";
import { ContactFormValues } from "@/utils/types";

const useContact = async (data:ContactFormValues) => {
  try{
    const response = await axiosInstance.post(contact, data);
    return response.data; 
  }catch(error:unknown){
    if(error instanceof Error){
      throw new Error(error.message);
    }else{
      throw new Error("Something went wrong");
    }
    
  }
}


  export const UseUserContact = ()=>{
    return useMutation({
        mutationKey:['contact'],
        mutationFn:useContact
        
    })
  }

