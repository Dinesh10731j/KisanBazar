"use client";

import React from "react";
import CartSummary from "../components/CartSummary";
import CartItem from "../components/CartItem";
import Header from "../components/header";
import Footer from "../components/footer";

const Cart = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1 bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 mt-20">

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cart Items take 2/3 on large screens */}
                    <div className="lg:col-span-2">
                        <CartItem />
                    </div>

                    {/* Cart Summary takes 1/3 on large screens */}
                    <div>
                        <CartSummary />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Cart;
