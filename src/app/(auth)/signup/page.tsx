"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormValues, signupSchema} from "@/zod_schema/schema";
import loginImage from "../../../../public/assets/images/login_image.jpg";
import { Mail, LockIcon,UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Link from "next/link";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupFormValues> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-r from-[#ff8a00] to-[#e52e71] px-4">
        {/* Wrapper with white background */}
        <div className="w-full lg:w-2/3 mt-24 md:mt-0 bg-white p-4 rounded-lg shadow-xl flex flex-col lg:flex-row items-center justify-center">
          {/* Image */}
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <Image
              src={loginImage}
              alt="Login"
              className="rounded-lg  object-cover"
              width={600}
              height={400}
              priority
            />
          </div>

          {/* Login Form */}
          <div className="w-full lg:w-1/2 max-w-md bg-white p-8 rounded-lg ">
            <h2 className="text-3xl font-bold text-center text-[#FB8C00] mb-6">
           Register Now!
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}

              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Username
                </label>
                <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
                  <UserCircle className="mr-2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Username"
                    {...register("email")}
                    className="w-full focus:outline-none"
                  />
                </div>
                {errors.username && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Email
                </label>
                <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
                  <Mail className="mr-2 text-gray-400" size={18} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className="w-full focus:outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Password
                </label>
                <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
                  <LockIcon className="mr-2 text-gray-400" size={18} />
                  <input
                    type="password"
                    placeholder="Your password"
                    {...register("password")}
                    className="w-full focus:outline-none"
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full cursor-pointer bg-[#FB8C00] hover:bg-[#E65100] text-white font-semibold py-2 rounded-md"
              >
                Signup
              </Button>
            </form>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-[#FB8C00] hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
