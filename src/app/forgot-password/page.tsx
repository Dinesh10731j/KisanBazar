"use client";
import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPasswordSchema,ForgotFormValues } from '@/zod_schema/schema';



const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotFormValues) => {
    console.log('Sending reset link to:', data.email);

  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#ff8a00] to-[#e52e71] text-white">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md bg-white backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
          <h1 className="text-2xl font-semibold text-center text-[#ff8a00] mb-4 ">
            Forgot Password
          </h1>
          <p className="text-sm text-black text-center mb-6">
            Enter your registered email to receive a password reset link.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
              className='bg-white text-gray-800'
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-[#FB8C00] cursor-pointer hover:bg-orange-600 text-white font-semibold"
            >
              Send Reset Link
            </Button>
          </form>
          <div className="mt-6 text-center">
            <a href="/login" className="text-white hover:underline text-sm">
              Back to Login
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
