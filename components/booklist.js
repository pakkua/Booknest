import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookList.css';

function BookList({ addToCart }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/books`);
        setBooks(response.data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please check your backend server and network connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div className="book-list-status">Loading books...</div>;
  }

  if (error) {
    return <div className="book-list-status error-message">Error: {error}</div>;
  }

  if (books.length === 0) {
    return <div className="book-list-status">No books found. Please add books to your database.</div>;
  }

  return (
    <div className="book-list-container">
      <div className="book-grid">
        {books.map((book) => (
          <div key={book.BookID} className="book-card">
            <img
              src={book.ImageURL || "https://placehold.co/150x200/F0F0F0/666666?text=No+Image"}
              alt={book.Title}
              className="book-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/150x200/F0F0F0/666666?text=No+Image";
              }}
            />
            <h3 className="book-title">{book.Title}</h3>
            <p className="book-author">Author ID: {book.AuthorID}</p>
            <p className="book-price">₹{parseFloat(book.Price).toFixed(2)}</p>
            <button onClick={() => addToCart(book)} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
