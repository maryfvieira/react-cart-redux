"use client";

import React from "react";
import { useDispatch, useSelector } from "../redux/store";
import { addToCart } from "@/redux/slices/cartSlice";
import { Product, CartItemState, CartState } from "@/global";

type Props = { wishItem: Product };

const CardWishlist = ({ wishItem }: Props) => {
  let cart: CartState;
  cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const add = (productId: number) => {
    // Dispatch the 'getResources' action to fetch data
    let cartItem = {} as CartItemState;
    cartItem.cartItemAmount = 1;
    cartItem.cartItemTotal = wishItem.product_price;
    cartItem.product = wishItem;
    cartItem.id = crypto.randomUUID();
    
    dispatch(addToCart(cartItem));
  };

  return (
    <div className="custom-card card">
      <img
        src={wishItem.product_image}
        className="card-img-top"
        style={{ maxHeight: "200px" }}
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{wishItem.product_name}</h5>
        <p className="card-text">{wishItem.product_desc}</p>
        <strong className="text-muted mt-2">${wishItem.product_price}</strong>
        <button
          onClick={() => {
            add(wishItem.id);
          }}
          className="btn btn-primary btn-block mt-3"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default CardWishlist;
