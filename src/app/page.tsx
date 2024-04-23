'use client';
import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart"
import Products from "../components/Products";
import Wishlist from "../components/Wishlist";
import Footer from "../components/Footer";

const Home = () => {
  return (
      <>
        <Navbar />
        {/* <div className="container">
          <Products />
          <Wishlist />
          <Cart />
        </div>  */}
        {/* <Footer /> */}
      </>
  )
}