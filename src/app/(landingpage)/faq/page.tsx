import React from 'react';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import faqImage from '../../../../public/assets/images/FAQ.jpg';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <>
      <Header />
      <main className="flex h-screen flex-col p-6 md:flex-row md:items-start md:space-x-8 bg-gradient-to-r from-[#ff8a00] to-[#e52e71] text-white">
        {/* FAQ Accordion Section */}
        <div className="w-full mt-15 md:mt-40 sm:mt-20 md:w-1/2">
          <h2 className="text-3xl font-bold text-center md:text-left text-white mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="cursor-pointer">What is KisanBazaar?</AccordionTrigger>
              <AccordionContent>
                KisanBazaar is an online platform that connects farmers directly with consumers, eliminating middlemen and ensuring fair prices.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="cursor-pointer">How do I place an order?</AccordionTrigger>
              <AccordionContent>
                You can browse our products, add them to your cart, and proceed to checkout. We deliver fresh products to your doorstep.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="cursor-pointer">What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                We accept online payments via eSewa, Khalti, and cash on delivery.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="cursor-pointer">How long does delivery take?</AccordionTrigger>
              <AccordionContent>
                Delivery typically takes 1-3 days depending on your location.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="cursor-pointer">Can I return or exchange products?</AccordionTrigger>
              <AccordionContent>
                Yes, we have a return policy for damaged or unsatisfactory products. Please contact our support team within 24 hours of delivery.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* FAQ Image Section */}
        <div className="w-full mt-15 md:mt-40 sm:mt-20 md:w-1/2 flex justify-center">
          <Image 
            src={faqImage} 
            alt="Frequently Asked Questions" 
            width={500} 
            height={400} 
            className="rounded-lg"
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Faq;
