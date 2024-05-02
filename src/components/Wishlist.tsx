'use client';

import React, { Component } from 'react'
import { connect } from 'react-redux';
import CardWishlist from '@components/CardWishlist';
import { useSelector } from '@redux/store';
import { CartState } from '@/global';

const Wishlist = () => {
    let cart : CartState;
    cart = useSelector((state) => state.cart);

    return (
        <div className="container mt-5">
            <h3>Wishlists</h3>
            <p className="text-muted">All Your Favorite Products</p>
            <div className="row mt-3">
                {
                    (cart.wishlist.products != null && cart.wishlist.products.length > 0) ? cart.wishlist.products.map(item =>
                     { 
                        console.log(item.product_name);
                        return (                      
                            <div className="col-md-3" key={Math.random()}>
                                <CardWishlist wishItem={item} />
                            </div>
                        );
                    }) : <p className="text-center mx-auto">Your wishlist is empty</p>
                }
            </div>
        </div>
    )
}

export default Wishlist;
