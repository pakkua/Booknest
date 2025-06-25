import React from 'react';
import '../App.css';
import './booklist';

const booksData = [
  {
    id: 1, title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson',
    year: 2016, pages: 224, price: '₹399',
    image: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L.jpg',
    blurb: 'A counterintuitive approach to living a good life.'
  },
  {
    id: 2, title: 'Educated', author: 'Tara Westover',
    year: 2018, pages: 352, price: '₹499',
    image: 'https://m.media-amazon.com/images/I/81WojUxbbFL.jpg',
    blurb: 'A memoir about the transformative power of education.'
  },
  {
    id: 3, title: 'Where the Crawdads Sing', author: 'Delia Owens',
    year: 2019, pages: 384, price: '₹449',
    image: 'https://m.media-amazon.com/images/I/81O1oy0y9eL.jpg',
    blurb: 'A coming-of-age story set in the South.'
  },
  {
    id: 4, title: 'Becoming', author: 'Michelle Obama',
    year: 2018, pages: 448, price: '₹519',
    image: 'https://m.media-amazon.com/images/I/81h2gWPTYJL.jpg',
    blurb: 'An intimate, powerful memoir by the former First Lady.'
  }
];

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Welcome to <span className="highlight">BookNest </span></h1>
          <p>Your online gateway to worlds untold. Discover your next favorite book!</p>
          <button className="browse-btn">Start Searching</button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1618365908648-e71bd5716cba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Reading books"
          className="hero-image"
        />
      </section>

      {/* Featured Books */}
      <section>
        <h2 className="section-title">Top Picks For You</h2>
        <div className="book-list">
          {booksData.map(book => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} className="book-image" />
              <h3>{book.title}</h3>
              <p className="author">by {book.author}</p>
              <p className="blurb">{book.blurb}</p>
              <p className="price">{book.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonial-section">
        <h2 className="section-title">What Our Readers Say</h2>
        <div className="testimonial">
          <p>“This site helped me fall in love with reading again!”</p>
          <p className="reviewer">— A Happy Reader</p>
        </div>
        <div className="testimonial">
          <p>“Amazing collection and fast delivery. 5 stars!”</p>
          <p className="reviewer">— Bookworm Jay</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 BookNest. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
          <a href="#">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
