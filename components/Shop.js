import React, { useEffect, useState } from 'react';
import BookList from './booklist';
import './Shop.css';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  "All", "Self-help", "Memoir", "Biography", "Young Adult",
  "Fantasy", "Science Fiction", "Romance", "Thriller",
  "Graphic Novel", "Historical Fiction"
];

const LIMIT = 20;

function Shop() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [hasMore, setHasMore] = useState(true);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  const fetchBooks = async (reset = false) => {
    const url = new URL('http://localhost:5000/books');
    url.searchParams.append('limit', LIMIT);
    url.searchParams.append('page', reset ? 1 : page);
    if (category !== "All") {
      url.searchParams.append('category', category);
    }

    const res = await fetch(url.toString());
    const data = await res.json();

    if (reset) {
      setBooks(data.data);
      setPage(1);
    } else {
      setBooks(prev => [...prev, ...data.data]);
    }

    setHasMore((page * LIMIT) < data.total);
  };

  useEffect(() => {
    fetchBooks(true);
  }, [category]);

  useEffect(() => {
    if (page > 1) {
      fetchBooks(false);
    }
  }, [page]);

  const addToCart = (book) => {
    const updatedCart = [...cart, { ...book, cartId: Date.now() }];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const loadMore = () => setPage(prev => prev + 1);

  return (
    <div className="shop-container">
      {/* Welcome Message */}
      <section>
        <h2 className="section-title">Welcome to BookNest! Your Literary Journey Begins Here.</h2>
        <p>Explore our vast collection of books across various genres.</p>
      </section>

      {/* Cart */}
      <div className="shop-topbar">
        <Link to="/cart" className="shop-cart">🛒 Cart: {cart.length} items</Link>
      </div>

      {/* Category Filters */}
      <div className="shop-categories">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`category-button ${category === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Book Cards from API */}
      <div className="book-list">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <img
              src={book.image || "https://placehold.co/150x200/F0F0F0/666666?text=No+Image"}
              alt={book.title}
              className="book-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/150x200/F0F0F0/666666?text=No+Image";
              }}
            />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-price">₹{book.price}</p>
            <p className="book-category">{book.category}</p>
            <button onClick={() => addToCart(book)} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Featured Books Section */}
      <section>
        <h2 className="section-title">Featured Books</h2>
        <BookList addToCart={addToCart} />
      </section>
    </div>
  );
}

export default Shop;
