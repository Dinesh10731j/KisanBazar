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


export interface CartItem{
  id:number,
  product_Name: string;
  product_Image: StaticImageData;
  product_Price: number;
  product_Description: string;
  quantity:number
}