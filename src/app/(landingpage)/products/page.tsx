"use client";
import React, { useState } from "react";
import Image from "next/image";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid3X3, List, XCircle } from "lucide-react"; 
import { useDispatch} from "react-redux";
import { addToCart } from "@/lib/store/slices/cartSlice";
import {getProductsResponse} from "@/utils/types";
import { UsegetProducts } from "@/hooks/useGetAllProducts";


const Products = () => {
  const [layout, setLayout] = useState("grid");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const {data:products=[]} = UsegetProducts()

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );


  const handleAddToCart = (items:getProductsResponse)=>{

    dispatch(addToCart({...items,quantity:1}));

  }

  return (
    <>
      <Header />
      <div className="min-h-[80vh] bg-gradient-to-r from-[#ff8a00] to-[#e52e71] py-10 px-4">
        <div className="max-w-7xl mx-auto mt-20">
          <h1 className="text-3xl font-bold text-green-700 mb-6">Our Products</h1>

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md border border-gray-300 rounded-md focus:ring-2 focus:ring-grey-600 focus:border-white"
            />
            <div className="flex gap-2">
              <Button
                variant={layout === "grid" ? "default" : "outline"}
                className="text-white cursor-pointer"
                onClick={() => setLayout("grid")}
              >
                <Grid3X3 size={16} className="mr-2 text-white cursor-pointer" />
                Grid
              </Button>
              <Button
                variant={layout === "list" ? "default" : "outline"}
                className="text-white cursor-pointer"
                onClick={() => setLayout("list")}
              >
                <List size={16} className="mr-2 text-white cursor-pointer" />
                List
              </Button>
            </div>
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div
              className={`${
                layout === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "space-y-7 space-x-5"
              }`}
            >
              {filteredProducts.map((product:getProductsResponse) => (
                <div
                  key={product.name}
                  className="bg-white shadow rounded-2xl p-4 flex flex-col md:flex-row items-center transition hover:shadow-lg"
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={layout === "grid" ? 300 : 120}
                    height={layout === "grid" ? 300 : 120}
                    className="object-contain rounded-md"
                  />
                  <div className="mt-4 md:mt-0 md:ml-6 w-full">
                    <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                    <p className="text-green-700 font-medium">NPR {product.price}</p>
                    <p className="text-sm text-gray-600 my-2">{product.description}</p>
                    <Button className="mt-2 bg-green-700 cursor-pointer hover:bg-green-800 text-white" 
                    onClick={()=>handleAddToCart(product)}
                    >
                      Add to cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-20">
              <XCircle size={60} className="text-red-500 mb-4" />
              <p className="text-white text-xl font-semibold">No products found.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
