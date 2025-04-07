import axiosInstance from "@/axiosInstance/axiosInstance";
import { Endpoints } from "@/api/endpoints";
const {contact} = Endpoints
import {useMutation} from "@tanstack/react-query";
import { ContactFormValues } from "@/utils/types";

const useContact = async (data:ContactFormValues) => {
    const response = await axiosInstance.post(contact, data);
    return response.data;
  }


  export const UseUserContact = ()=>{
    return useMutation({
        mutationKey:['contact'],
        mutationFn:useContact
        
    })
  }

