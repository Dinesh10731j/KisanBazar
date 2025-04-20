import { StaticImageData } from "next/image";

export interface ContactFormValues {
  name: string;
    email: string;
    message: string; 
}


export interface LoginFormValues {
  email: string;
  password: string;
}
export interface SignupFormValues {
  username: string;
  email: string;
  password: string;
}


export interface SidebarProps {
  role: "admin" | "farmer" | "user"; 
}


export interface CartItems{
  id:number,
  product_Name: string;
  product_Image: StaticImageData;
  product_Price: number;
  product_Description: string;
  quantity:number
}



export interface SignupResponse  {
  access_token: string;
  refresh_token: string;
};


export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}



export interface ContactResponse {
  message:string,
  error:string,
}

export interface Product {
  id: number;
  product_Name: string;
  product_Image: StaticImageData;
  product_Price: number;
  product_Description: string;
  quantity:number
}

