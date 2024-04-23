'use client';

import React from 'react';
import { useDispatch } from '../redux/store';
import { addWishlist } from '@/redux/slices/cartSlice';
import { Product } from '@/global';

const CardWishlist = (wishItem : Product) => {

    const dispatch = useDispatch();

    const add = (productId : number) => {
        // Dispatch the 'getResources' action to fetch data
        dispatch(addWishlist(productId));
      };

    return (
        <div className="custom-card card">
            <img src={wishItem.product_image} className="card-img-top" style={{ maxHeight: "200px" }} alt="..." />
            <div className="card-body">
                <h5 className="card-title">{wishItem.product_name}</h5>
                <p className="card-text">{wishItem.product_desc}</p>
                <strong className="text-muted mt-2">${wishItem.product_price}</strong>
                <button onClick={() => {add(wishItem.id)}} className="btn btn-primary btn-block mt-3">Add To Cart</button>
            </div>
        </div>
    )
}

export default CardWishlist;