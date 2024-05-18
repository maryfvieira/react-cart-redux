'use client'

import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Link, Button } from '@mui/material';
import Image from "next/image";
// Import Redux-related functions and actions
import { useSelector, useDispatch } from '../redux/store';
import Navbar from "../components/Navbar";
import Cart from "../components/Cart"
import Products from "../components/Products";
import Wishlist from "../components/Wishlist";
import Footer from "../components/Footer";
import '../app/index.css'
import container from '@/di/ioc.config';


// Define the Home component
const Home: React.FC = () => {

  // JSX for the main component
  return (
    <main>
      <Navbar /> 
      <div className="container">
        <Products container={container}/>
        <Wishlist />
        <Cart />
      </div>
      <Footer />
    </main>
  );
};

// Export the Home component as the default export
export default Home;
