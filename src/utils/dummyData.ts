
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



    export const blogs = [{
        blogTitle: "The Benefits of Buying Local Produce",
        blogImage: tomatoImage,
        blogDescription: "Discover the advantages of supporting local farmers and enjoying fresh produce.",
        blogDate: "2023-10-01",
        blogAuthor: "John Doe",
        blogAuthorImage: UserCircle,
        blogContent: "Buying local produce not only supports your community but also ensures that you get the freshest fruits and vegetables. Local farmers often use sustainable practices, which are better for the environment. Plus, you get to enjoy seasonal produce at its peak flavor. In this blog, we explore the many benefits of choosing local over imported goods.",
        blogCategory: "Health & Wellness",
        blogTags: ["Local", "Fresh", "Sustainable"],

       
    },
    {
        blogTitle: "5 Easy Recipes with Spinach",
        blogImage: spinachImage,
        blogDescription: "Try these delicious and healthy spinach recipes for your next meal.",
        blogDate: "2023-10-05",
        blogAuthor: "Jane Smith",
        blogAuthorImage: UserCircle,
        blogContent: "Spinach is a versatile leafy green that can be used in a variety of dishes. From salads to smoothies, spinach adds a nutritious boost to your meals. In this blog, we share five easy recipes that highlight the deliciousness of spinach. Whether you're looking for a quick salad or a hearty soup, we've got you covered.",
        blogCategory: "Recipes",
        blogTags: ["Spinach", "Healthy", "Recipes"],
    },
    {
        blogTitle: "The Importance of Sustainable Farming",
        blogImage: onionImage,
        blogDescription: "Learn about sustainable farming practices and their impact on the environment.",
        blogDate: "2023-10-10",
        blogAuthor: "Emily Johnson",
        blogAuthorImage: UserCircle,
        blogContent: "Sustainable farming is crucial for preserving our planet's resources. It focuses on methods that are environmentally friendly and economically viable. In this blog, we discuss the importance of sustainable farming practices and how they contribute to a healthier planet. From crop rotation to organic farming, discover how these methods can make a difference.",
        blogCategory: "Sustainability",
        blogTags: ["Sustainable", "Farming", "Environment"],
    },
    

    ]