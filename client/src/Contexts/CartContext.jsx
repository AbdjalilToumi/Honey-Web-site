import { createContext, useContext, useState } from "react";


const CartContext = createContext();

export function CartProvider({ children }) {
    let [cart, setCart] = useState([]);

    // add product to cart 
    let addToCart = (product) => {
        // check if product is in the cart 
        let isexist = cart.find((p) => p.id === product.id);
        // if it's not in the cart 
        if(!isexist){
            setCart((prev) => [...prev, {...product, quantity : 1}]); 
        }
    };

    // reset cart 
    let resetCart = () => {
        setCart([]);
    }
    // remove product from the cart
    let removeFromCart = (id) => {
        // same logic 
        let isexist = cart.find((p) => p.id === id);
        console.log(isexist);
        if(isexist){
            setCart((prev) => prev.filter((p) => p.id !== id));
        }
        else{
            console.log("Product Not FOUND from removeFromCart");
        }
    };

    // increment quantity
    let incrementQuantity = (id) => {   
        cart.map((product) =>{
            if(product.id === id){
                product.quantity++;
            }
        })
    }
    // decrement quantity 
    let decrementQuantity = (id) => {
        cart.map((product) => {
            if(product.id === id){
                product.quantity <= 1? product.quantity = 1: product.quantity--;
            }
        })
    }

    let getQuantity = (id) => {
        let quantityItem = -1;
        cart.map((item) =>{
            if(item.id === id){
                quantityItem = item.quantity;
            }
        })
        return quantityItem;
    }
    let getTotalPrice = () => {
        let totalPrice = 0;
        cart.map((item) =>{
            totalPrice += (item.price * item.quantity);
        })
        return totalPrice;
    }
    return (<CartContext.Provider value={ {cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, getQuantity, getTotalPrice, resetCart }}>
        {
            children
        }
    </CartContext.Provider>)
}


export let useCart = () => useContext(CartContext);