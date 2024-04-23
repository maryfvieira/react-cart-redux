'use client';

import React from 'react';
import { useDispatch } from '../redux/store';
import { addToCart } from '@/redux/slices/cartSlice';

const CardProduct = ({ product }) => {
    const dispatch = useDispatch();

    const add = (product) => {
        // Dispatch the 'getResources' action to fetch data
        dispatch(addToCart(product));
      };
    

    return (
        <div className="custom-card card">
            <img src={product.product_image} className="card-img-top" style={{ maxHeight: "200px" }} alt="..." />
            <div className="card-body">
                <h5 className="card-title">{product.product_name}</h5>
                <p className="card-text">{product.product_desc}</p>
                <strong className="text-muted mt-2">${product.product_price}</strong>
                <button onClick={() => add(product)} className="btn btn-primary btn-block mt-3">Add To Cart</button>
            </div>
        </div>
    )
}

export default CardProduct;
