import React, { useEffect, useState } from "react";
import { getAll, update } from "../BooksAPI";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";
/**
 * @description render a book List
 * @returns {Component} Book List UI
 */
const BookList = () => {
  const [books, setBooks] = useState();
  const [isBookLoaded, setIsBookLoaded] = useState(false);

  /**
   * @description fetch All books from API
   */
  const getAllBooks = async () => {
    setIsBookLoaded(false);
    let allBooks = await getAll();
    setBooks(() => [...allBooks]);
    setIsBookLoaded(true);
  };

  /**
   * @description update Book shelf
   * @param {Object} book - book that want to update
   * @param {string} shelf - wanted shelf that want to move book to it
   */
  const updateBook = async (book, shelf) => {
    setIsBookLoaded(false);
    book.shelf = shelf;
    await update(book, shelf);
    setBooks([...books.filter((b) => b.id !== book.id), book]);
    setIsBookLoaded(true);
  };

  /**
   * @description get All books at first render
   */
  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div>
      {!(books && isBookLoaded) && <div className="loader"></div>}
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {books && (
              <BookShelf books={books} updateBook={updateBook}/>
            )}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
};

export default BookList;
