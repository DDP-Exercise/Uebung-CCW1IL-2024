// src/app.js
import Book from './Book.js';
import Catalog from './Catalog.js';

document.addEventListener('DOMContentLoaded', () => {
    const catalog = new Catalog();
    catalog.loadBooks();
    updateBookList();

    document.getElementById('addBookForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = document.getElementById('year').value;

        const book = new Book(title, author, year);
        catalog.addBook(book);
        catalog.saveBooks();
        updateBookList();
    });

    function updateBookList() {
        const bookList = document.getElementById('bookList');
        bookList.innerHTML = '';

        catalog.books.forEach(book => {
            const bookItem = document.createElement('li');
            bookItem.textContent = `${book.title} by ${book.author}, published in ${book.year}`;
            bookList.appendChild(bookItem);
        });
    }
});
