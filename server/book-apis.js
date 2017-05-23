const express = require('express');
const Book = require('./models/Book.js');

const router = express.Router();

function formatBook(book) {
  return {
    id: book._id,
    title: book.title,
    author: book.author,
    pubYear: book.pubYear,
    description: book.description
  };
}

router.get('/api/books', (req, res) => {

  Book.find({ userId: req.user._id })
    .exec((err, data) => {
      res.send({
        books: data.map((book) => formatBook(book))
      });
    });

});

router.post('/api/book', (req, res) => {

  const book = new Book();
  book.title = req.body.title;
  book.author = req.body.author;
  book.pubYear = req.body.pubYear;
  book.description = req.body.description;
  book.userId = req.user._id;

  book.save((err, data) => {
    res.send(formatBook(data));
  });
});

router.delete('/api/book/:id', (req, res) => {

  Book.findByIdAndRemove(req.params.id, (err, data) => {
    res.sendStatus(204);
  });

});

module.exports = router;
