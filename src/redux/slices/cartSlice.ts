import products from '../../app/api/product.json'
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product, Wishlist, CartItemState, CartState, Stock, CartItem } from "../../global";
import crypto from 'crypto';

let allProducts: Product[];
allProducts = products;

const initProducts = [...products]

// products: Product[];
// wishlist: Wishlist;
// cartItems: CartItemState[];
// amount: number;
// total: number;
// isLoading: boolean;

const initialState: CartState = {
  products: initProducts,
  wishlist: {} as Wishlist,
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};


  // Create a Redux slice for managing card data
  const cartSlice = createSlice({
    name: "cart", // Name of the slice
    initialState, // Initial state
    reducers: {
      clearCart: state => {
        state.cartItems = [];
        state.products = allProducts;
        state.amount=0;
        state.total=0;
      },
      addToCart: (state, action: PayloadAction<CartItemState>) => {
        //exibir somente produtos que não estão no carrinho
        state.products = state.products.filter(item => item.id !== action.payload.product.id);

        //remover o produto da lista de desejos
        state.wishlist.products = state.wishlist.products.filter(item => item.id !== action.payload.product.id);
        
        let amount = state.amount;
        let total = state.total;

        let cartItem: CartItemState | undefined;
        cartItem = state.cartItems.find(
          item => item.product.id === action.payload.product.id
        );
        if (cartItem === undefined) {
          
          cartItem = action.payload;
          // cartItem.product.id = action.payload.product.id;
          // cartItem.product.product_price = action.payload.product.product_price;
          // cartItem.product.product_name = action.payload.product.product_name;
          // cartItem.product.product_image = action.payload.product.product_image;
          // cartItem.product.product_desc = action.payload.product.product_desc;
          // cartItem.product.product_color = action.payload.product.product_color;
          // cartItem.product.product_size = action.payload.product.product_size;
        } else {
          amount = amount - cartItem.cartItemAmount;
          total = total - cartItem.cartItemTotal;

          state.cartItems = state.cartItems.filter(
            item => item.product.id !== action.payload.product.id
          );
        }

        cartItem.cartItemAmount = action.payload.cartItemAmount;
        cartItem.cartItemTotal =
          cartItem.cartItemAmount * action.payload.product.product_price;
        state.cartItems.push(cartItem);

        state.amount = amount + cartItem.cartItemAmount;
        state.total = total + cartItem.cartItemTotal;
      },
      addWishlist: (state, action) => {
        const productId = action.payload;
        if(state.wishlist.products.find(item => item.id == productId) == undefined){
          let filProduct = allProducts.find(item => item.id === productId);
          if(filProduct != undefined)
            state.wishlist.products.push(filProduct)
        }
      },
      removeFromCart: (state, action) => {
        const productId = action.payload;

        //state.wishlist.products = state.wishlist.products.filter(item => item.id !== productId);

        const cartItemToRemove = state.cartItems.find(
          item => item.product.id === productId
        );

        if (cartItemToRemove !== undefined) {
          state.cartItems = state.cartItems.filter(
            item => item.product.id !== productId
          );
  
          state.total = state.amount - cartItemToRemove.cartItemTotal;
          state.amount -= cartItemToRemove?.cartItemAmount;

          let filProduct = cartItemToRemove.product;
          state.products.push(filProduct);
          
        }
      },
      addItemQty: (state, action) => {
        const productId = action.payload;
        const cartItem = state.cartItems.find(item => item.product.id === productId);
        if (cartItem !== undefined) {
          
          let total = state.total - cartItem.cartItemTotal;
  
          cartItem.cartItemAmount += 1;
          cartItem.cartItemTotal =
            cartItem.cartItemAmount * cartItem.product.product_price;
          total += cartItem.cartItemTotal;
  
          state.cartItems = state.cartItems.filter(
            item => item.product.id !== productId
          );
          state.cartItems.push(cartItem);
          state.amount += 1;
          state.total = total;
        }
      },
      removeItemQty: (state, action) => {
        const productId = action.payload;
        const cartItem = state.cartItems.find(item => item.product.id === productId);
        if (cartItem !== undefined && cartItem.cartItemAmount > 0) {
          let total = state.total - cartItem.cartItemTotal;
  
          cartItem.cartItemAmount -= 1;
          cartItem.cartItemTotal =
            cartItem.cartItemAmount * action.payload.productPrice;
          total += cartItem.cartItemTotal;
  
          state.cartItems = state.cartItems.filter(
            item => item.product.id !== productId
          );
          if (cartItem.cartItemAmount > 0){
            state.cartItems.push(cartItem);
          }else{
            state.products.push(cartItem.product);
          }
  
          state.amount -= 1;
          state.total = total;
        }
      },
  }
});

export const {
  clearCart,
  addToCart, 
  addWishlist, 
  removeFromCart,
  addItemQty,
  removeItemQty
} = cartSlice.actions;

export default cartSlice.reducer;
  