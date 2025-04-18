import {
  LayoutDashboard,
  BarChart,
  Users,
  ShoppingCart,
  Settings,
  Package,
  PlusCircle,
  LineChart,
  User,
  Home,
  Store,
  ShoppingBag,
} from "lucide-react";

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
      { label: "Dashboard", path: "/dashboard/admin", icon: LayoutDashboard },
      { label: "Overview", path: "/dashboard/admin/overview", icon: BarChart },
      { label: "Manage Users", path: "/dashboard/admin/manage-users", icon: Users },
      { label: "Orders", path: "/dashboard/admin/orders", icon: ShoppingCart },
      { label: "Settings", path: "/dashboard/admin/settings", icon: Settings },
    ],
    farmer: [
      { label: "Dashboard", path: "/dashboard/farmer", icon: LayoutDashboard },
      { label: "My Products", path: "/dashboard/farmer/products", icon: Package },
      { label: "Add Product", path: "/dashboard/farmer/addproducts", icon: PlusCircle },
      { label: "Sales", path: "/dashboard/farmer/sales", icon: LineChart },
      { label: "Profile", path: "/dashboard/farmer/profile", icon: User },
    ],
    user: [
      { label: "Home", path: "/user/home", icon: Home },
      { label: "Shop", path: "/user/shop", icon: Store },
      { label: "Cart", path: "/user/cart", icon: ShoppingBag },
      { label: "Orders", path: "/user/orders", icon: ShoppingCart },
    ],
  };
  