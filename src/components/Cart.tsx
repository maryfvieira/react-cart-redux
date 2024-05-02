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
          <h4>Itens do carrinho: ( {cart.cartItems.length} )</h4>
          <hr className="my-3" />
          {cart.cartItems.map((cartItem) => (
            <CartItem cartItem={cartItem} key={Math.random()}/>
          ))}
        </div>
      </div>
      <div className="col-lg-4 col-md-12">
        <div className="custom-card" style={{ borderRadius: "10px" }}>
          <h5>Valor total</h5>
          <hr className="my-3" />
          <div className="d-flex justify-content-between">
            <p className="text-muted">Total de itens</p>
            <p className="text-muted">{cart.amount}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="text-muted">Entrega</p>
            <p className="text-muted">Free</p>
          </div>
          <hr className="my-2" />
          <div className="d-flex justify-content-between align-items-center mb-4">
            <strong>Total</strong>
            <strong>${cart.total.toFixed(2)}</strong>
          </div>

          <form target="pagseguro" method="post" action="https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=EBA5CD410909084DD4A3CF869D2B8AA5">
            <input type="hidden" name="email_cobranca" value="suporte@lojamodelo.com.br" />
            <input type="hidden" name="tipo" value="CP" />
            <input type="hidden" name="moeda" value="BRL" />

            <input type="hidden" name="item_id_1" value="12345" />
            <input type="hidden" name="item_descr_1" value="Descrição do item a ser vendido" />
            <input type="hidden" name="item_quant_1" value="1" />
            <input type="hidden" name="item_valor_1" value="100" />
            <input type="hidden" name="item_frete_1" value="0" />
            <input type="hidden" name="item_peso_1" value="0" />

            <input type="hidden" name="item_id_2" value="67890" />
            <input type="hidden" name="item_descr_2" value="Descrição do item 2 a ser vendido" />
            <input type="hidden" name="item_quant_2" value="1" />
            <input type="hidden" name="item_valor_2" value="199" />
            <input type="hidden" name="item_frete_2" value="0" />
            <input type="hidden" name="item_peso_2" value="0" />

            <input type="hidden" name="tipo_frete" value="EN" />
            <input className="btn btn-primary btn-block py-2" type="image" src="https://p.simg.uol.com.br/out/pagseguro/i/botoes/pagamentos/99x61-pagar-assina.gif" name="submit" alt="Pague com PagBank - é rápido, grátis e seguro!" />
          </form>
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
