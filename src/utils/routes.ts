export const headerRoutes =[
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Blogs", path: "/blog" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ]


  export const dashboardRoutes = {
    admin: [
      { label: "Dashboard", path: "/dashboard/admin" },
      {label:"Overview",path:"/dashboard/admin/overview"},
      { label: "Manage Users", path: "/dashboard/admin/manage-users" },
      { label: "Orders", path: "/dashboard/admin/orders" },
      { label: "Settings", path: "/dashboard/admin/settings" },
    ],
    farmer: [
      { label: "My Products", path: "/farmer/products" },
      { label: "Add Product", path: "/farmer/add" },
      { label: "Sales", path: "/farmer/sales" },
      { label: "Profile", path: "/farmer/profile" },
    ],
    user: [
      { label: "Home", path: "/user/home" },
      { label: "Shop", path: "/user/shop" },
      { label: "Cart", path: "/user/cart" },
      { label: "Orders", path: "/user/orders" },
    ],
  };
