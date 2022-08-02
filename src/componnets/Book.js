import React from "react";
import PropTypes from "prop-types"
/**
 * @description reander a book
 * @param {object} book - book full Object
 * @param {function} updateBook - function to update Book Shelf
 * @param {Array} allBooks - Array of all books exsist
 * @param {Array} shelves - All Shelves
 * @returns {Component} Book componnet UI
 */
const Book = ({ book, updateBook, allBooks,shelves}) => {

    /**
     * @description get Book shelf 
     * @param {Array} allBooks - all exsist books
     * @param {Object} currentBook - current book object
     * @returns {Array} Book object from all books array
     */
    const getBooksStatus = (allBooks, currentBook) => {
        return allBooks.filter((book) => {
            return book.title === currentBook.title;
        })[0]
    }

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url("${book?.imageLinks?.thumbnail}")`,
                        }}
                    ></div>
                    <div className="book-shelf-changer">
                        <select
                            value={
                                (allBooks && getBooksStatus(allBooks, book)?.shelf)
                                ||
                                book?.shelf
                                ||
                                'none'
                            }
                            onChange={(e) => updateBook(book, e.target.value)}
                        >
                            <option value="" disabled>
                                Move to...
                            </option>
                            {shelves.map((shelf) => {
                                return <option key={shelf.id} value={shelf.shelfName}>{shelf.shelfDisplayName}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="book-title">{book?.title}</div>
                <div className="book-authors">
                    {book?.authors?.map((author, index) => {
                        return <div key={index}>{author}</div>;
                    })}
                </div>
            </div>
        </li>
    );
};
Book.propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired,
    allBooks: PropTypes.array
};
export default Book;
