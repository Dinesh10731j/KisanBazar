import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
const {contact} = Endpoints
import {useMutation} from "@tanstack/react-query";
import { ContactFormValues } from "@/utils/types";
import { ContactResponse } from "@/utils/types";

const useContact = async (data:ContactFormValues):Promise<ContactResponse> => {
  try{
    const response = await axiosInstance.post<ContactResponse>(contact, data);
    return response.data; 
  }catch(error){
    if(error instanceof Error){
      throw new Error(error.message);
    }
      throw new Error("Something went wrong");
    }
    
  }



  export const UseUserContact = ()=>{
    return useMutation<ContactResponse,Error,ContactFormValues>({
        mutationKey:['contact'],
        mutationFn:useContact
        
    })
  }

