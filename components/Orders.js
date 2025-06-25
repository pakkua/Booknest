import React, { useEffect, useState } from 'react';
import './Order.css';
import { Link } from 'react-router-dom';

function Order() {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (bookId, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === bookId ? { ...item, quantity: parseInt(quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const placeOrder = () => {
    localStorage.removeItem('cart');
    setCart([]);
    setOrderPlaced(true);
  };

  const totalPrice = cart.reduce((acc, item) => {
    const price = parseFloat(item.price.replace('₹', ''));
    return acc + price * (item.quantity || 1);
  }, 0);

  if (orderPlaced) {
    return (
      <div className="order-container">
        <h2>🎉 Thank you for your order!</h2>
        <p>Your books will be delivered soon.</p>
        <Link to="/shop" className="order-back-btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="order-container">
      <h2>Your Order Summary</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/shop">Browse books</Link>.</p>
      ) : (
        <>
          <table className="order-table">
            <thead>
              <tr>
                <th>Book</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((book) => {
                const price = parseFloat(book.price.replace('₹', ''));
                const quantity = book.quantity || 1;
                return (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.price}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => updateQuantity(book.id, e.target.value)}
                      />
                    </td>
                    <td>₹{(price * quantity).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="order-summary">
            <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
            <button className="place-order-btn" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Order;
