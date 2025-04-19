'use client';
import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import { Tractor, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4">
        <Tractor className="w-20 h-20 text-green-600 mb-4 animate-bounce" />
        <h1 className="text-2xl md:text-5xl lg:6xl sm:3xl font-bold text-green-700 mb-2">404 - Page not found</h1>
        <p className="text-gray-600 max-w-md mb-6">
          Oops! Looks like this field is empty. The page you&apos;re looking for has either moved or never existed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
        >
          <ArrowLeft className="mr-2" />
          Go Back Home
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
