'use client';
import { createContext, useContext, useState } from 'react';

interface Product {
  id: string;
  name: string;
  cartegory: string;
  image: string;
  price: number;
  weigth: string;
  quantity: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Omit<Product, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  getQuantity: (id: string) => number;
  getTotalPrice: () => number;
  resetCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  let [cart, setCart] = useState<Product[]>([]);

  let addToCart = (product: Omit<Product, 'quantity'>) => {
    let isexist = cart.find((p) => p.id === product.id);
    if (!isexist) {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  let resetCart = () => {
    setCart([]);
  };

  let removeFromCart = (id: string) => {
    let isexist = cart.find((p) => p.id === id);
    if (isexist) {
      setCart((prev) => prev.filter((p) => p.id !== id));
    } else {
      console.log('Product Not FOUND from removeFromCart');
    }
  };

  let incrementQuantity = (id: string) => {
    setCart((prev) => 
      prev.map((product) => 
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  let decrementQuantity = (id: string) => {
    setCart((prev) => 
      prev.map((product) => 
        product.id === id ? { ...product, quantity: Math.max(1, product.quantity - 1) } : product
      )
    );
  };

  let getQuantity = (id: string) => {
    const item = cart.find(item => item.id === id);
    return item ? item.quantity : -1;
  };

  let getTotalPrice = () => {
    let totalPrice = 0;
    cart.map((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, getQuantity, getTotalPrice, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export let useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
