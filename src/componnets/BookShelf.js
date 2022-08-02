import React from 'react';
import Book from './Book';
import PropTypes from "prop-types";

/**
 * @description reander  BookShelfs
 * @param {object} books - all books
 * @param {function} updateBook - function to update Book Shelf
 * @returns {Component} BookShelf componnet UI
 */

const BookShelf = ({ books, updateBook }) => {
    const shelves = [
        { id: "1", shelfName: "currentlyReading", shelfDisplayName: "Currently Reading" },
        { id: "2", shelfName: "wantToRead", shelfDisplayName: "want To Read" },
        { id: "3", shelfName: "read", shelfDisplayName: "Read" },
        { id: "4", shelfName: "none", shelfDisplayName: "None" },
    ]
    return (
        <div className="bookshelf">
            {shelves.filter((shelf)=>shelf.shelfName!=='none').map((s) => (
                <div key={s.id}>
                    <h2 className="bookshelf-title">{s.shelfDisplayName}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books
                                .filter((f) => f.shelf === s.shelfName)
                                .map((book) => (
                                    <Book key={book.id} book={book} updateBook={updateBook} shelves={shelves} />
                                ))}
                        </ol>
                    </div>
                </div>
            ))}
        </div>

    );
}

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
};
export default BookShelf;
