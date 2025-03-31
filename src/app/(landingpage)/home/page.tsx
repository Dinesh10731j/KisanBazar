import React from 'react';
import Image from 'next/image';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import KisanBazarBackgroundImage from '../../../../public/assets/images/kisanbazar_background_image.jpg';
import { Button } from '@/components/ui/button';
const Home = () => {
  return (
    <>
      <Header />
      <main className="relative min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="relative w-full h-screen flex items-center justify-center">
          {/* Background Image */}
          <Image
            src={KisanBazarBackgroundImage}
            alt="KisanBazar Background"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0"
          />

          {/* Overlay for Better Readability */}
          <div className="absolute inset-0 bg-opacity-50 z-10"></div>

          {/* Content */}
          <div className="relative z-20 text-center text-white px-6">
            <h1 className="text-4xl sm:text-6xl font-extrabold">
              Fresh Produce Direct from Farmers to Your Doorstep!
            </h1>
            <p className="mt-4 text-lg sm:text-xl">
              Support local farmers & enjoy farm-fresh goods with fair pricing.
            </p>
            <Button 
  variant={'ghost'} 
  className="mt-6 cursor-pointer px-12 py-6 bg-[#FB8C00] hover:bg-[#E65100] text-white text-lg font-semibold rounded-lg transition duration-300 
    sm:px-8 sm:py-4 sm:text-md md:px-10 md:py-5 md:text-lg lg:px-12 lg:py-6 lg:text-xl">
  Buy Now
</Button>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
