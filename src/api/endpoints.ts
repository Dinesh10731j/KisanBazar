const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const Endpoints = {
  contact: `${BASE_URL}/api/v1/users/contact`,
  login: `${BASE_URL}/api/v1/users/login`,
  signup: `${BASE_URL}/api/v1/users/register`,
  payment: `${BASE_URL}/api/v1/payments/initiate`,
  addProduct: `${BASE_URL}/api/v1/farmers/add-products`,
  getProducts: `${BASE_URL}/api/v1/farmers/get-products`,
};
