'use client';

import React, { Component, useState } from 'react'

import CardProduct from '@components/CardProduct';

import { useEffect } from 'react';
import { Product } from '@/global';
import Loading from "@components/Loading";
import {getProductService} from "@/hooks/container";

const Products = () => {

    const [data, setData] = useState<Product[] | undefined>([])
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const GetProducts = async () => {
            const products = await getProductService().getAll();
            console.log("products " + products)
            setData(products.data);
        }
        GetProducts()
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [])

    return (
        <div className="container mt-5">
            {
                isLoading ? (<Loading />) : (

                    <div><h3>Produtos</h3><p className="text-muted">Confira nossa lista de produtos</p><div className="row mt-3">
                        {(data!= undefined && data.length > 0) ? data.map(product => (
                            <div className="col-md-3" key={product.id}>
                                <CardProduct product={product} />
                            </div>
                        )) : <p className="text-center mx-auto">No Product Available</p>}
                    </div></div>)
            }
        </div>
    )
}

export default Products;