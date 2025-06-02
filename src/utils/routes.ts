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
  MapPinned
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
      { label: "Live Location", path: "/dashboard/admin/location", icon: MapPinned }

    ],
    farmer: [
      { label: "Dashboard", path: "/dashboard/farmer", icon: LayoutDashboard },
      { label: "My Products", path: "/dashboard/farmer/products", icon: Package },
      { label: "Add Product", path: "/dashboard/farmer/addproducts", icon: PlusCircle },
      { label: "Sales", path: "/dashboard/farmer/sales", icon: LineChart },
      { label: "Profile", path: "/dashboard/farmer/profile", icon: User },
      { label: "Live Location", path: "/dashboard/farmer/location", icon: MapPinned }

    ],
    user: [
      { label: "Home", path: "/dashboard/customer", icon: Home },
      { label: "Shop", path: "/dashboard/customer/shop", icon: Store },
      { label: "Cart", path: "/dashboard/customer/cart", icon: ShoppingBag },
      { label: "Orders", path: "/dashboard/customer/orders", icon: ShoppingCart },
      { label: "Live Location", path: "/dashboard/customer/location", icon: MapPinned }

    ],
  };
  