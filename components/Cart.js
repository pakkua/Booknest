import React, { useEffect, useState } from 'react';
import './Cart.css'; // 👉 CSS file for styles

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const removeFromCart = (cartIdToRemove) => {
    const updatedCart = cartItems.filter(item => item.cartId !== cartIdToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-container">
      <div className="cart-overlay">
        <h2>Your Cart</h2>
        <p>Hello , welcome! Here are your cart items:</p>

        {cartItems.length === 0 ? (
          <p className="empty-msg">🛒 Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.cartId} className="cart-card">
              <img
                src={item.image || "https://placehold.co/150x200/F0F0F0/666666?text=No+Image"}
                alt={item.title}
                className="cart-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/150x200/F0F0F0/666666?text=No+Image";
                }}
              />
              <h3>{item.title || "No title"}</h3>
              <p>₹{item.price || "N/A"}</p>
              <p>{item.category || "Unknown Category"}</p>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.cartId)}
              >
                Remove from Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;
