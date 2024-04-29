"use client";

import React, { Component } from "react";
//import Accordion from '@material-ui/core/Accordion';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
//import AccordionSummary from '@material-ui/core/AccordionSummary';
//import AccordionDetails from '@material-ui/core/AccordionDetails';
//import Typography from '@material-ui/core/Typography';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { ExpandMore } from "@mui/icons-material";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "../redux/store";
import { CartState } from '@/global';

const Cart = () => {
  let cart : CartState;
  cart = useSelector((state) => state.cart);
  
  return (
    <div className="row mt-5">
      <div className="col-lg-8 col-md-12">
        <div className="custom-card">
          <h4>Cart ( {cart.cartItems.length} Items)</h4>
          <hr className="my-3" />
          {cart.cartItems.map((cartItem) => (
            <CartItem cartItem={cartItem} key={Math.random()}/>
          ))}
        </div>
      </div>
      <div className="col-lg-4 col-md-12">
        <div className="custom-card" style={{ borderRadius: "10px" }}>
          <h5>The Total Amount Of</h5>
          <hr className="my-3" />
          <div className="d-flex justify-content-between">
            <p className="text-muted">Temporary Amount</p>
            <p className="text-muted">{cart.amount}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="text-muted">Shipping</p>
            <p className="text-muted">Free</p>
          </div>
          <hr className="my-2" />
          <div className="d-flex justify-content-between align-items-center mb-4">
            <strong>Total</strong>
            <strong>${cart.total.toFixed(2)}</strong>
          </div>
          <button className="btn btn-primary btn-block py-2">
            GO TO CHECKOUT
          </button>
        </div>
        <Accordion className="mt-3 py-2">
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Add a discount code (optional)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="d-flex flex-column" style={{ width: "100%" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Your Discount Code"
              />
              <button className="btn btn-primary btn-block mt-3">SUBMIT</button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Cart;
