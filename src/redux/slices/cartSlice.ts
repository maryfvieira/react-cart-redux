import products from '../../app/api/product.json'
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product, Wishlist, CartItemState, CartState, Stock } from "@/global";

let allProducts: Product[];
allProducts = products;

let cartItems: CartItemState[];
cartItems = [];

const emptyWishlist = (): Wishlist => ({
  products: []
});

const initProducts = [...products]

const initialState: CartState = {
  products: [],
  wishlist: { products: [] } as Wishlist,
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: state => {
      state.cartItems = [];
      state.products = [];
      state.amount = 0;
      state.total = 0;
    },
    addToCart: (state, action: PayloadAction<CartItemState>) => {
      //exibir somente produtos que não estão no carrinho
      //state.products = state.products.filter(item => item.id !== action.payload.product.id);

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
      let cartItem = state.cartItems.find(item => item.product.id == productId);
      if (cartItem !== undefined) {
        state.wishlist.products.push(cartItem.product);
      }
    },
    removeFromCart: (state, action) => {
      console.log("entrou");
      const productId = action.payload;

      const cartItemToRemove = state.cartItems.find(
        item => item.product.id === productId
      );

      if (cartItemToRemove !== undefined) {
        state.cartItems = state.cartItems.filter(
          item => item.product.id !== productId
        );

        state.total = state.total - cartItemToRemove.cartItemTotal;
        state.amount -= cartItemToRemove.cartItemAmount;

        //let filProduct = cartItemToRemove.product;
        //state.products.push(filProduct);

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
          cartItem.cartItemAmount * cartItem.product.product_price;
        total += cartItem.cartItemTotal;

        state.cartItems = state.cartItems.filter(
          item => item.product.id !== productId
        );
        if (cartItem.cartItemAmount > 0) {
          state.cartItems.push(cartItem);
        }//else{
        //   state.products.push(cartItem.product);
        // }

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
