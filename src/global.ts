export interface Product {
    id: number;
    product_name: string;
    product_desc: string;
    product_color: string;
    product_size: string;
    product_price: number;
    product_image: string;
    product_qty: number;
  }
  
  export interface Stock {
    product:  Product;
    product_qty: number;
  }
  
  export interface Wishlist {
    products: Product[];
  }
  
  export interface CartItemState {
    id: string | undefined | null;
    product:  Product;
    cartItemAmount: number;
    cartItemTotal: number;
  }
  
  export interface CartState {
    products: Product[];
    wishlist: Wishlist;
    cartItems: CartItemState[];
    amount: number;
    total: number;
    isLoading: boolean;
  }