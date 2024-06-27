'use client';

import React, { Component, useState } from 'react'

import CardProduct from '@components/CardProduct';

import { useRef, useEffect } from 'react';
import { ProductService } from '@/services/productService';
import { Headers } from '@/services/httpclient/axios/headers';
import { Product } from '@/global';
import Loading from "@components/Loading";
import 'reflect-metadata';
import ApiClient from '@/services/httpclient/axios/apiClient';
import TYPES from '@/services/httpclient/axios/types';
import { Container } from 'inversify';

function getProductApi(container: Container): ProductService {
    const apiClient = container.get<ApiClient>(TYPES.ApiClient);
    return new ProductService(apiClient);
}

type Props = { container: Container};

const Products = ({ container }: Props) => {

    const [data, setData] = useState<Product[] | undefined>([])
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const GetProducts = async () => {
            // try{
            //const productManager = await createProductManager();

            const products = await getProductApi(container).getAll();
            console.log("products " + products)
            setData(products.data);

            // }catch (error: any){
            //     console.log(error);
            // }finally{
            //     setLoading(false)
            // }
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