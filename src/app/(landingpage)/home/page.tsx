import React from 'react';
import Image from 'next/image';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import KisanBazarBackgroundImage from '../../../../public/assets/images/kisanbazar_background_image.jpg';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
          <div className="absolute inset-0  bg-opacity-50 z-10"></div>
          <div className="relative z-20 text-center text-white px-6">
            <h1 className="text-4xl sm:text-6xl font-extrabold">
              Fresh Produce Direct from Farmers to Your Doorstep!
            </h1>
            <p className="mt-4 text-lg sm:text-xl">
              Support local farmers & enjoy farm-fresh goods with fair pricing.
            </p>
            <Button 
              variant={'ghost'}
              className="mt-6 cursor-pointer px-12 py-6 bg-[#FB8C00] hover:bg-[#E65100] text-white text-lg font-semibold rounded-lg transition duration-300 sm:px-8 sm:py-4 sm:text-md md:px-10 md:py-5 md:text-lg lg:px-12 lg:py-6 lg:text-xl">
              <ShoppingCart className="mr-2 h-12 w-12" strokeWidth={2} />
              Buy Now
            </Button>
          </div>
        </section>
        
        {/* Key Benefits */}
        <section className=" mt-4 bg-gradient-to-r from-[#ff8a00] to-[#e52e71]  py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose KisanBazar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">No Middlemen: Get farm-fresh products at great prices!</div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">Support Local Farmers</div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">Direct Delivery to Your Home</div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-16 mt-4 bg-gradient-to-r from-[#ff8a00] to-[#e52e71]  text-center">
          <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
          <p> best-selling products ...</p>
        </section>
        
        {/* How It Works */}
        <section className="py-16 mt-4 bg-gradient-to-r from-[#ff8a00] to-[#e52e71]  text-center">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">1. Choose your products</div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">2. Place an order directly from the farmer</div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">3. Get fresh products delivered to your doorstep</div>
          </div>
        </section>
        
        {/* Customer Testimonials */}
        <section className="py-16 mt-4 bg-gradient-to-r from-[#ff8a00] to-[#e52e71]  text-center">
          <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
          <p>Customer Reviews</p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
