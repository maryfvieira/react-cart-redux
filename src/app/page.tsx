'use client'

import React from 'react';

import Navbar from "@/components/Navbar";
import Cart from "@/components/Cart"
import Products from "@/components/Products";
import Wishlist from "@/components/Wishlist";
import Footer from "@/components/Footer";
import '../app/index.css'

// Define the Home component
const Home: React.FC = () => {

  // JSX for the main component
  return (
    <main>
      <Navbar /> 
      <div className="container">
        {/* <Products/>
        <Wishlist />
        <Cart /> */}
      </div>
      <Footer />
    </main>
  );
};
export default Home;
