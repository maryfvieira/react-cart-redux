'use client'

import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Link, Button } from '@mui/material';
import Image from "next/image";
import styles from "./page.module.css";
// Import Redux-related functions and actions
import { useSelector, useDispatch } from '../redux/store';
import { getResources } from '@/redux/slices/mainSlice';
import Navbar from "../components/Navbar";
import Cart from "../components/Cart"
import Products from "../components/Products";
import Wishlist from "../components/Wishlist";
import Footer from "../components/Footer";

// Define the Home component
const Home: React.FC = () => {

  // JSX for the main component
  return (
    <main className={styles.main}>
      <Navbar />
      <Products />
      {/* <Wishlist /> */}
      {/* <Cart /> */}
      <Footer />
    </main>
  );
};

// Export the Home component as the default export
export default Home;
