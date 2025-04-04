import React from "react";
import Image from "next/image";
import happyFarmerImage from "../../../../public/assets/images/happy-farmer.jpg";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { Button } from "@/components/ui/button";
const About = () => {
  return (
    <>
   
   <Header/>
    <div className=" mx-auto p-8 text-white  bg-gradient-to-r from-[#ff8a00] to-[#e52e71] ">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mt-20">About KisanBazar</h1>
        <p className="mt-2 text-lg">Connecting farmers directly with customers for fresh and fair trade.</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        <Image src={happyFarmerImage} alt="Happy Farmer" width={500} height={350} className="rounded-lg shadow-lg" />
        <div>
          <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
          <p className="mt-2">At KisanBazar, our goal is to connect customers directly with farmers, ensuring farm-fresh products, supporting local agriculture, and cutting out the middleman.</p>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-white">Our Values</h2>
        <ul className="list-disc pl-6 mt-2">
          <li><strong>Freshness:</strong> We promise to deliver only the freshest products.</li>
          <li><strong>Transparency:</strong> Customers know exactly where their products come from.</li>
          <li><strong>Supporting Farmers:</strong> Helping local farmers get fair prices for their produce.</li>
        </ul>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-white">Join Us</h2>
        <p className="mt-2">Be a part of KisanBazar and support local farmers. Start shopping today!</p>
        <Button>
        <a href="/shop" className="mt-4 inline-block px-6 py-3 bg-[#FB8C00] hover:bg-[#E65100] text-white font-semibold rounded-lg">Visit Our Shop</a>
        </Button>
      
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default About;
