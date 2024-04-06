import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsContainer from "./components/ProductsContainer";
import Cart from "./components/Cart";

function App() {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        const newItem = { ...product, quantity: 1 };
        setCartItems([...cartItems, newItem]);
    };

    const removeFromCart = (productId) => {
        const updatedCartItems = cartItems.filter(
            (item) => item.id !== productId
        );
        setCartItems(updatedCartItems);
    };

    const updateQuantity = (productId, newQuantity) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProductsContainer
                            onAddToCart={addToCart}
                            cartItems={cartItems}
                            onRemoveItem={removeFromCart}
                        />
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <Cart
                            cartItems={cartItems}
                            onRemoveItem={removeFromCart}
                            onUpdateQuantity={updateQuantity}
                        />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
