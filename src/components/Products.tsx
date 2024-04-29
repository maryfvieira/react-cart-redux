'use client';

import React from 'react'
import CardProduct from './CardProduct';
import { useSelector } from '../redux/store';
import { CartState } from '@/global';

const Products = () => {
    let cart2 : CartState;
    cart2 = useSelector((state) => state.cart);
    
    {console.log(cart2)}
    return (
        <div className="container mt-5">
            <h3>All Products</h3>
            <p className="text-muted">All Products that available to order</p>
            <div className="row mt-3">
                {
                    cart2.products.length > 0 ? cart2.products.map(product => (
                        <div className="col-md-3" key={product.id}>
                            <CardProduct product={product}/>
                        </div>
                    )) : <p className="text-center mx-auto">No Product Available</p>
                }
            </div>
        </div>
    )
}


export default Products;
