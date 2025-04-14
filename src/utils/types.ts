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