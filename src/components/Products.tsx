'use client';

import React, { Component, useState } from 'react'
import ReactDOM from 'react-dom';
import CardProduct from '@components/CardProduct';
import { useSelector } from '@redux/store';
import { CartState } from '@/global';
import { useRef, useEffect } from 'react';
import { ProductsApi } from '@/app/api/product/productsApi';
import { Headers } from '@/app/api/client/axios/headers';
import { Product } from '@/global';
import Loading from "@components/Loading";
import 'reflect-metadata';
import ApiClient from '@/app/api/client/axios/apiClient';
import TYPES from '@/app/api/client/axios/types';
import { Container } from 'inversify';

function getBaseHeaders(): Headers {
    let headers = new Headers();
    headers.addItem("Content-Type", "application/json");
    return headers;
}

function getProductApi(container: Container): ProductsApi {
    const apiClient = container.get<ApiClient>(TYPES.ApiClient);
    return new ProductsApi(apiClient);
}

type Props = { container: Container};

const Products = ({ container }: Props) => {

    const [data, setData] = useState<Product[]>([])
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const GetProducts = async () => {
            // try{
            //const productManager = await createProductManager();

            const products = await getProductApi(container).getAll(getBaseHeaders(), "Products");
            console.log("products " + products)
            setData(products);

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
                        {data.length > 0 ? data.map(product => (
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