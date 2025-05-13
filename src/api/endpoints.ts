const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const Endpoints = {
  contact: `${BASE_URL}/api/v1/users/contact`,
  login: `${BASE_URL}/api/v1/users/login`,
  signup: `${BASE_URL}/api/v1/users/register`,
  payment: `${BASE_URL}/api/v1/payments/initiate`,
  addProduct: `${BASE_URL}/api/v1/farmers/add-products`,
  getProducts: `${BASE_URL}/api/v1/farmers/get-products`,
  deleteProduct: `${BASE_URL}/api/v1/farmers/delete-product`,
  updateProduct: `${BASE_URL}/api/v1/farmers/update-product`,
  updateProfile: `${BASE_URL}/api/v1/farmers/update-profile`,
  products: `${BASE_URL}/api/v1/farmers/products`,
  farmerSalesOverview :`${BASE_URL}/api/v1/farmers/sales-overview`,
  farmerDashboard :`${BASE_URL}/api/v1/farmers/dashboard`,
  adminDashboard : `${BASE_URL}/api/v1/admin/dashboard`,
  adminOverView: `${BASE_URL}/api/v1/admin/overview`,
  adminManageUsers:`${BASE_URL}/api/v1/admin/manage-users`,
  adminRemoverUsers:`${BASE_URL}/api/v1/admin`,
  adminChangeRole:`${BASE_URL}/api/v1/admin`,
  adminOrders:`${BASE_URL}/api/v1/admin/orders`,
  adminSetting:`${BASE_URL}/api/v1/admin`
};
