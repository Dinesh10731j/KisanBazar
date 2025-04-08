import React from "react";
import Image from "next/image";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import KisanBazarBackgroundImage from "../../../../public/assets/images/kisanbazar_background_image.jpg";
import {
  ShoppingCart,
  Handshake,
  Truck,
  Leaf,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { products, customerReviews } from "@/utils/dummyData";

const Home = () => {
  return (
    <>
      <Header />
      <main className="relative min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="relative w-full h-screen flex items-center justify-center">
          <Image
            src={KisanBazarBackgroundImage}
            alt="KisanBazar Background"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0"
          />
          <div className="absolute inset-0 bg-opacity-50 z-10"></div>
          <div className="relative z-20 text-center text-pink-600 px-6">
            <h1 className="text-4xl sm:text-6xl font-extrabold">
              Fresh Produce Direct from Farmers to Your Doorstep!
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-200">
              Support local farmers & enjoy farm-fresh goods with fair pricing.
            </p>
            <Button
              variant={"ghost"}
              className="mt-6 cursor-pointer px-12 py-6 bg-[#FB8C00] hover:bg-[#E65100] text-white text-lg font-semibold rounded-lg transition duration-300 sm:px-8 sm:py-4 sm:text-md md:px-10 md:py-5 md:text-lg lg:px-12 lg:py-6 lg:text-xl"
            >
              <ShoppingCart className="mr-0 h-6 w-6" strokeWidth={2} />
              Buy Now
            </Button>
          </div>
        </section>

        {/* Key Benefits */}
        <section className=" px-3 bg-gradient-to-r from-[#ff8a00] to-[#e52e71] py-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Why Choose KisanBazar?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
              <Handshake className="text-[#FB8C00] w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-pink-600">
                No Middlemen
              </h3>
              <p className="text-gray-600">
                Get farm-fresh products at great prices!
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
              <Leaf className="text-[#FB8C00] w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-pink-600">
                Support Local Farmers
              </h3>
              <p className="text-gray-600">
                Your purchases directly help farmers earn fair prices.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
              <Truck className="text-[#FB8C00] w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-pink-600">
                Direct Delivery
              </h3>
              <p className="text-gray-600">
                Fresh products delivered straight to your doorstep.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-3 bg-gradient-to-r from-[#ff8a00] to-[#e52e71] text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Featured Products
          </h2>
          <Carousel className="relative">
            <CarouselContent className="-ml-2 md:-ml-4">
              {products.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-1/1 sm:basis-1/2 md:basis-1/3"
                >
                  <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center">
                    <Image
                      src={product.product_Image}
                      alt={product.product_Name}
                      width={150}
                      height={150}
                      className="rounded-md"
                    />
                    <h3 className="text-xl font-semibold mt-4 text-pink-600">
                      {product.product_Name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                      {product.product_Description}
                    </p>
                    <p className="text-lg font-bold text-[#E65100] mt-2">
                      Rs. {product.product_Price}
                    </p>
                    <Button className="mt-4 bg-[#FB8C00] hover:bg-[#E65100] text-white px-4 py-2 rounded-lg">
                      Add to Cart
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Navigation buttons with custom icons */}
            <CarouselPrevious className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-700">
              <ChevronLeft className="h-6 w-6 cursor-pointer" />
            </CarouselPrevious>
            <CarouselNext className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-700">
              <ChevronRight className="h-6 w-6 cursor-pointer" />
            </CarouselNext>
          </Carousel>
        </section>

        {/* How It Works */}
        <section className="py-16 px-3 bg-gradient-to-r from-[#ff8a00] to-[#e52e71] text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center">
              <ShoppingCart className="text-[#FB8C00] w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-pink-600">
                Choose Your Products
              </h3>
              <p className="text-gray-600">
                Select from a wide range of fresh farm products.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center">
              <Handshake className="text-[#FB8C00] w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-pink-600">
                Place an Order
              </h3>
              <p className="text-gray-600">
                Buy directly from farmers at fair prices.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center">
              <Truck className="text-[#FB8C00] w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-pink-600">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Get fresh produce delivered to your doorstep.
              </p>
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-16 bg-gradient-to-r from-[#ff8a00] px-3 to-[#e52e71] text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            What Our Customers Say
          </h2>
          <Carousel className="relative">
            <CarouselContent className="-ml-2 md:-ml-4">
              {customerReviews.map((review, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-1/1 sm:basis-1/2 md:basis-1/3"
                >
                  <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center">
                    <p className=" text-xl font-semibold mt-2 text-pink-600">
                      {review.customerName}
                    </p>
                    <h3 className="text-xl font-semibold mt-4">
                      {React.createElement(review?.customerImage, {
                        size: 120,
                      })}
                    </h3>
                    <p className="text-gray-600 text-sm">{review.review}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Navigation buttons with custom icons */}
            <CarouselPrevious className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-700">
              <ChevronLeft className="h-6 w-6 cursor-pointer" />
            </CarouselPrevious>
            <CarouselNext className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-700">
              <ChevronRight className="h-6 w-6 cursor-pointer" />
            </CarouselNext>
          </Carousel>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
