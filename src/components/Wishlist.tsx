'use client';

import React, { Component } from 'react'
import { connect } from 'react-redux';
import CardWishlist from './CardWishlist';
import { addToCart } from '../redux/actions/cart';
import { useSelector } from '../redux/store';

const Wishlist = () => {
    const { cart } = useSelector((state) => state.cart);

    return (
        <div className="container mt-5">
            <h3>Wishlists</h3>
            <p className="text-muted">All Your Favorite Products</p>
            <div className="row mt-3">
                {
                    cart.wishlist.products.length > 0 ? cart.wishlist.products.map(item => (
                        <div className="col-md-3">
                            <CardWishlist wishItem={item} />
                        </div>
                    )) : <p className="text-center mx-auto">Your wishlist is empty</p>
                }
            </div>
        </div>
    )
}

export default Wishlist;
