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

export interface CartItems {
  id: number;
  product_Name: string;
  product_Image: StaticImageData;
  product_Price: number;
  product_Description: string;
  quantity: number;
}

export interface SignupResponse {
  access_token: string;
  refresh_token: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  role: string;
}

export interface ContactResponse {
  message: string;
  error: string;
}

export interface Product {
  id: number;
  product_Name: string;
  product_Image: StaticImageData;
  product_Price: number;
  product_Description: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  amount: string;
}




export interface PaymentFormValues {
  customerId: string;
  productIds: string[];
  farmerIds:string[];
  products: {
    name: string;
    price: string;
    quantity: number;
  }[];
  amount: number;
  paymentMethod: 'eSewa' | 'Khalti' | 'onCash';
  orderId: string[];
}


export interface PaymentResponse {
  message: string;
  error: string;
  orderId: string;
  paymentUrl: string;
}


export interface addProductFormValues {
  name: string;
  price: string;
  quantity: string;
  description?: string;
  image: File| null;
}

export interface addProductReponse{
  message:string
}


export type getProductsResponse = {
  _id: string;
  name: string;
  price: string;
  quantity: number;
  description: string;
  imageUrl: string;
  farmerId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type getProductsResponseType = getProductsResponse[];


export interface deleteProductResponse {
  message: string;
  error: string;
}


export interface updateProductResponse {
  message: string;
  error: string;

}

export interface updateProfileFormValues {
  username:string,
  email:string,
  password:string,  
}


export interface updateProfileResponse {
  message: string;
  error: string;
}

export interface SalesOverviewResponse {
  _id: string;
  farmerName: string;
  productName: string;
  totalPrice: number;
  totalQuantity: number;
  date: string; 
}

export type SalesOverview = SalesOverviewResponse[];


export interface FarmerDashboardResponse {
  totalProducts: number;
  totalSales: number;
  pendingOrders: number;
  salesOverview: {
    day: number;   
    total: number;
  }[];
  products: {
    name: string;
    price: string;
    quantity: string;
    status?: string; 
    _id: string;
  }[];
}

//AdminDashBoard Response


export interface DashboardResponse {
  totalFarmers: number;
  totalOrders: number;
  deliveredOrders: number;
  revenue: number;
  totalCustomers: number;
  totalProducts: number;
  ordersOverTime: OrderOverTime[];
}

export interface OrderOverTime {
  date: string; // e.g., "2025-05-10"
  orders: Order[];
}

export interface Order {
  _id: string;
  customerName: string;
  productIds: string[];
  farmerIds: string[];
  products: Product[];
  amount: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string; // ISO string
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}


export interface ordersOverTime{
  date:string,
  orderCount:number
}


export interface overViewResponse{
  
  totalOrders: number,
  percentChange: string,
  ordersOverTime: ordersOverTime[]

}


export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

// Full response shape
export interface UsersResponse {
  success: boolean;
  users: User[];
}





interface OrderProduct {
  productName: string;
  amount: number;
  imageUrl: string;
  farmerName: string;
}

// Type for each order in the response
interface OrderResponseItem {
  buyerName: string;
  products: OrderProduct[];
  totalAmount: number;
  paymentStatus: 'Success' | 'Failed' | 'Pending';
}

// Final API response type
export type OrdersResponse = OrderResponseItem[];


