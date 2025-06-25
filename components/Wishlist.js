import React, { useEffect, useState } from 'react';
import './Wishlist.css'; // 👉 Make sure to create this file

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(storedWishlist);
  }, []);

  const removeFromWishlist = (wishlistIdToRemove) => {
    const updatedWishlist = wishlistItems.filter(item => item.wishlistId !== wishlistIdToRemove);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div className="wishlist-container">
      <div className="wishlist-overlay">
        <h2>💖 Your Wishlist</h2>
        <p>Hey , here are the books you've saved to wishlist!</p>

        {wishlistItems.length === 0 ? (
          <p className="empty-msg">Your wishlist is empty.</p>
        ) : (
          wishlistItems.map((item) => (
            <div key={item.wishlistId} className="wishlist-card">
              <img
                src={item.image || "https://placehold.co/150x200/F0F0F0/666666?text=No+Image"}
                alt={item.title}
                className="wishlist-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/150x200/F0F0F0/666666?text=No+Image";
                }}
              />
              <h3>{item.title || "No Title"}</h3>
              <p>₹{item.price || "N/A"}</p>
              <p>{item.category || "Unknown Category"}</p>
              <button
                className="remove-btn"
                onClick={() => removeFromWishlist(item.wishlistId)}
              >
                Remove from Wishlist
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Wishlist;
