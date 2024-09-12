"use client";

import React from "react";
import { toZonedTime } from 'date-fns-tz'

import { useSelector, useDispatch } from "../redux/store";
import { CartState } from '@/global';
 import { clearCart } from '@/redux/slices/cartSlice';
import { Persistor } from "redux-persist";

const pt_BR = "America/Sao_Paulo";
const daysToCleanCart = 1;

type Props = { persistor: Persistor };

const CartReduxCleaner = ({ persistor }: Props) => {
   const dispatch = useDispatch();

  let cart = {} as CartState | undefined;
  cart = useSelector((state) => state.cart);

  const today = toZonedTime(new Date(), pt_BR);
  //let limitDayToCleanCart = toZonedTime(new Date(today.getTime() - (daysToCleanCart * 24 * 60 * 60 * 1000)), pt_BR);
  let limitDayToCleanCart = toZonedTime(new Date(today.getTime() - (1 * 60 * 1000)), pt_BR); // 3 minutes to expire
  
  if(cart?.createdDate !== undefined){
    let createdDate = toZonedTime(cart?.createdDate, pt_BR);
    if(createdDate < limitDayToCleanCart){
        dispatch(clearCart());
        //persistor.purge();
    }
  }
  
  return (<></>);
};

export default CartReduxCleaner;
