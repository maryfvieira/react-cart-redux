'use client';

import React from 'react'
import Button from '@mui/material/Button';
import {Delete, Favorite} from '@mui/icons-material';
import { useSelector, useDispatch } from '@redux/store';
import { addItemQty, addWishlist, removeItemQty, removeFromCart } from '@/redux/slices/cartSlice'; 
import { Product, CartItemState, CartState } from '@/global';

type Props = { cartItem: CartItemState;};

const CartItem = ({ cartItem }: Props) => {

    let cart = {} as CartState | undefined;
    cart = useSelector((state) => state.cart);

    let cartItemAmount = cart?.cartItems.find(item=> item.product.id == cartItem.product.id)?.cartItemAmount;

    const dispatch = useDispatch();

    const incrementWishList = (productId: number) => {
        // Dispatch the 'getResources' action to fetch data
        dispatch(addWishlist(productId));
        dispatch(removeFromCart(productId));
      };
      const remove = (productId: number) => {
        // Dispatch the 'getResources' action to fetch data
        dispatch(removeFromCart(productId));
      };
      const removeItem = (productId: number) => {
        // Dispatch the 'getResources' action to fetch data
        dispatch(removeItemQty(productId));
      };
      const addItem = (productId: number) => {
        // Dispatch the 'getResources' action to fetch data
        dispatch(addItemQty(productId));
      };

    return (
        <>
            <div className="row mt-3 no-gutters">
                <div className="col-md-3">
                    <img className="rounded" style={{ maxWidth: "100%", maxHeight: "200px" }} src={cartItem.product.product_image} alt="" />
                </div>
                <div className="col-md-6">
                    <div className="mt-3">
                        <h5 className="font-weight-bold">{cartItem.product.product_name}</h5>
                        <p className="text-muted">{cartItem.product.product_desc}</p>
                        <p className="text-muted mt-3">COLOR: {cartItem.product.product_color}</p>
                        <p className="text-muted mt-n3">SIZE: {cartItem.product.product_size}</p>
                        <div className="mt-3">
                            <Button
                                variant="text"
                                style={{ color: "grey" }}
                                startIcon={<Delete />}
                                onClick={() => remove(cartItem.product.id)}
                            >
                                REMOVE ITEM
                            </Button>
                            <Button
                                className="ml-2"
                                variant="text"
                                style={{ color: "grey" }}
                                startIcon={<Favorite />}
                                onClick={() => incrementWishList(cartItem.product.id)}
                            >
                                MOVE TO WISHLIST
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="input-group mt-3 mb-5">
                        <div className="input-group-prepend">
                            <button className="btn btn-outline-secondary font-weight-bold" disabled={cartItemAmount === 1} onClick={() => removeItem(cartItem.product.id)}> -- </button>
                        </div>
                        <input type="text" readOnly className="form-control text-center" value={cartItemAmount} aria-label="Example text with button addon" aria-describedby="button-addon1" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary font-weight-bold" onClick={() => addItem(cartItem.product.id)}>+</button>
                        </div>
                    </div>
                    <h5 className="text-muted font-weight-bold mt-3 float-right">${cartItem.product.product_price}</h5>
                </div>
            </div>
        </>
    )
}

export default CartItem;
