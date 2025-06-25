const db = require('../db2');

exports.getCart = (req, res) => {
  const { userId } = req.params;
  db.query('SELECT * FROM cart WHERE user_id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch cart items', error: err });
    res.json(results);
  });
};

exports.addToCart = (req, res) => {
  const { user_id, book_id, quantity } = req.body;
  const query = 'INSERT INTO cart (user_id, book_id, quantity) VALUES (?, ?, ?)';
  db.query(query, [user_id, book_id, quantity], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to add to cart', error: err });
    res.json({ message: 'Item added to cart' });
  });
};

exports.removeFromCart = (req, res) => {
  const { cartId } = req.params;
  db.query('DELETE FROM cart WHERE id = ?', [cartId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to remove from cart', error: err });
    res.json({ message: 'Item removed from cart' });
  });
};
