import React from 'react';
import { blogs } from '@/utils/dummyData';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
const Blog = () => {
  return (
    <div className="bg-gradient-to-r from-[#ff8a00] to-[#e52e71] min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow px-4 py-8 md:px-8 lg:px-16 mt-20">
        <h1 className="text-4xl md:text-5xl text-white font-bold text-center mb-12">
          KisanBazaar Blog
        </h1>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={blog.blogImage}
                alt={blog.blogTitle}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center mb-2 text-sm text-gray-500">
                  <Image
                    src={blog.blogImage}
                    alt={blog.blogAuthor}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span>{blog.blogAuthor}</span>
                  <span className="mx-2">•</span>
                  <span>{blog.blogDate}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {blog.blogTitle}
                </h2>
                <p className="text-gray-600 mb-4">{blog.blogDescription}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.blogTags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <Button variant="outline" className="text-[#e52e71] border-[#e52e71] hover:bg-[#e52e71]/10">
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
