const express = require('express');
const shortId = require('shortid');

const db = require('../db.js')

const router = express.Router();

router.get('/', (request, response) => {
  response.render('./users/users.pug', {
    users: db.get('users').value(),
    books: db.get('books').value()
  });
});

router.post('/',(request, response) => {
  db.get('users')
    .find({name:"Kiệt"})
    .get('bookName')
    .push({id: shortId.generate(), book: request.body.bookName})
    .write();
  response.redirect('/users');
});

router.get('/edit-form/:bookId', (request, response) => {
  var bookId = request.params.bookId;
  db.get('users').find({name:"Kiệt"}).get('bookName').value().filter(book => {
    if(bookId === book.id) {   
      response.render('./users/editBook.user.pug', {
        book: book,
        books: db.get('books').value()
      })   
    }
  })
});

router.post('/edit/:bookId', (request, response) => {
  var bookId = request.params.bookId;
  var newBook = request.body.book;
  db.get('users')
    .find({name:'Kiệt'})
    .get('bookName')
    .find({id:bookId})
    .assign({book:newBook})
    .write();
  response.redirect('/users');
});

router.get('/delete/:bookId', (request, response) => {
  var bookId = request.params.bookId;
  db.get('users')
    .find({name:'Kiệt'})
    .get('bookName')
    .remove({id: bookId})
    .write();
  response.redirect('/users');
})

module.exports = router;