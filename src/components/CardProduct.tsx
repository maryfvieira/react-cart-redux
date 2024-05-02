'use client';

import React from 'react';
import { useDispatch } from '@redux/store';
import { addToCart } from '@/redux/slices/cartSlice';
import { Product, CartItemState } from '@/global';

type Props = { product: Product;};

const CardProduct = ({ product } : Props) => {

    const dispatch = useDispatch();

    const add = (item: CartItemState) => {
        // Dispatch the 'getResources' action to fetch data
        dispatch(addToCart(item));
      };
    
    return (
        <div className="custom-card card">
            <img src={product.product_image} className="card-img-top" style={{ maxHeight: "200px" }} alt="..." />
            <div className="card-body">
                <h5 className="card-title">{product.product_name}</h5>
                <p className="card-text">{product.product_desc}</p>
                <strong className="text-muted mt-2">${product.product_price}</strong>
                <button onClick={() => { let cartItem = {} as CartItemState; 
                                          cartItem.cartItemAmount = 1;
                                          cartItem.cartItemTotal = product.product_price;
                                          cartItem.product = product;
                                          cartItem.id=crypto.randomUUID();
                                          add(cartItem)}}
                                        className="btn btn-primary btn-block mt-3">Add To Cart</button>
            </div>
        </div>
    )
}

export default CardProduct;
