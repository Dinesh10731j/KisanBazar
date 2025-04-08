"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/zod_schema/schema";
import loginImage from "../../../../public/assets/images/login_image.jpg";
import { Mail, LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Link from "next/link";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
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
              Welcome Back!
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
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
                Login
              </Button>
            </form>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-[#FB8C00] hover:underline">
                Register
              </Link>
            </p>

            {/* Forgot Password Link */}
            <p className="text-center text-sm text-gray-500 mt-2">
              <Link
                href="/forgot-password"
                className="text-[#FB8C00] hover:underline"
              >
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
