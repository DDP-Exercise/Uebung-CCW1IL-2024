// src/Catalog.js
import Book from './Book.js';

export default class Catalog {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    saveBooks() {
        localStorage.setItem('books', JSON.stringify(this.books));
    }

    loadBooks() {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        this.books = books.map(bookData => new Book(bookData.title, bookData.author, bookData.year));
    }
}
