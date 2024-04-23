'use client';

import React from 'react'
import CardProduct from './CardProduct';
import { useSelector } from '../redux/store';

const Products = () => {

    const { cart } = useSelector((state) => state.cart);

    return (
        <div className="container mt-5">
            <h3>All Products</h3>
            <p className="text-muted">All Products that available to order</p>
            <div className="row mt-3">
                {
                    cart.products.length > 0 ? cart.products.map(product => (
                        <div className="col-md-3">
                            <CardProduct product={product}/>
                        </div>
                    )) : <p className="text-center mx-auto">No Product Available</p>
                }
            </div>
        </div>
    )
}


export default Products;
