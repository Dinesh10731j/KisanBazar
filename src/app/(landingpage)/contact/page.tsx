"use client";
import React from "react";
import { Phone, MessageCircle, UserCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import contactImage from "../../../../public/assets/images/contact_image.jpg";
import { contactSchema } from "@/zod_schema/schema";
import { ContactFormValues } from "@/zod_schema/schema";
import { UseUserContact } from "@/hooks/userContact";
import Spinner from "@/app/components/Loader";
import { useDispatch } from "react-redux";
import { addToast } from "@/lib/store/slices/toastSlice";
const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });


  const mutation = UseUserContact();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        dispatch(addToast({ message: 'Message Sent Successfully', type: "success" }))
      },
      onError: (error) => {
        dispatch(addToast({ message: error.message, type: "error" }))
      }
    })
    reset();

  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-[#ff8a00] to-[#e52e71] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="max-w-6xl mt-20 w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-50 rounded-2xl overflow-hidden">
          {/* Left Side - Image */}
          <div className="hidden md:block relative">
            <Image
              src={contactImage}
              alt="Contact"
              layout="fill"
              objectFit="cover"
              className="h-full w-full"
            />
          </div>

          {/* Right Side - Form */}
          <div className="p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-pink-600 mb-6">Contact Us</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="flex items-center gap-2 mb-1 font-semibold text-gray-700">
                  <UserCircle size={20} />
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 mb-1 font-semibold text-gray-700">
                  <Mail size={20} />
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 mb-1 font-semibold text-gray-700">
                  <MessageCircle size={20} />
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-xl"
              >
                {mutation.isPending ? <Spinner /> : "Send Message"}
              </Button>
            </form>

            <div className="mt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Phone size={18} />
                +977-9800000000
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Mail size={18} />
                support@kisanbazaar.com
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
