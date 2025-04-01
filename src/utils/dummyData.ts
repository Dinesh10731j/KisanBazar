
import tomatoImage from "../../public/assets/images/fresh-red-tomatoes.jpg";
import onionImage from "../../public/assets/images/onion.jpg";
import spinachImage from "../../public/assets/images/spinach.jpg";
import {UserCircle} from "lucide-react"
export const products = [
  {
    product_Name: "Tomato",
    product_Image: tomatoImage,
    product_Price: 20,
    product_Description: "Fresh and juicy tomatoes from local farms.",

  },
 
    {
        product_Name: "Onion",
        product_Image: onionImage,
        product_Price: 10,
        product_Description: "Fresh onions with a rich flavor, perfect for cooking.",
    },
 
    {
        product_Name: "Spinach",
        product_Image: spinachImage,
        product_Price: 22,
        product_Description: "Organic spinach, rich in iron and vitamins.",
    },
    
 

  ];



  export const customerReviews = [
    { 
        customerName: "John Doe",
        review: "KisanBazar has changed the way I shop for groceries. The quality is unbeatable!",
        customerImage :UserCircle

    },
    {
        customerName: "Jane Smith",
        review: "I love supporting local farmers. The freshness of the produce is amazing!",
        customerImage :UserCircle
    },
    {
        customerName: "Emily Johnson",
        review: "Fast delivery and great prices! Highly recommend KisanBazar.",
        customerImage :UserCircle
    },
    
    {
        customerName: "Michael Brown",
        review: "The variety of products is impressive. I find everything I need here.",
        customerImage :UserCircle
    },
    {
        customerName: "Sarah Davis",
        review: "KisanBazar makes grocery shopping easy and enjoyable. Love it!",
        customerImage :UserCircle
    },
    ]