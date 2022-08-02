import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll, search, update } from "../BooksAPI";
import Book from "./Book";
/**
 * @description render search page
 * @returns {Component} search componnet UI
 */
const Search = () => {
    const [searchResullt, setSearchResullt] = useState();
    const [isBookLoaded, setIsBookLoaded] = useState(true);
    const [sarchKeyword, setSarchKeyword] = useState("");
    const [isErrorHappen, setIsErrorHappen] = useState(false);
    const [allBooks, setAllBooks] = useState(false);
    const shelves = [
        { id: "1", shelfName: "currentlyReading", shelfDisplayName: "Currently Reading" },
        { id: "2", shelfName: "wantToRead", shelfDisplayName: "want To Read" },
        { id: "3", shelfName: "read", shelfDisplayName: "Read" },
        { id: "4", shelfName: "none", shelfDisplayName: "None" },
    ]
    /**
    * @description fetch All books from API
    */
    const getAllBooks = async () => {
        setIsBookLoaded(false);
        let allBooks = await getAll();
        setAllBooks(() => [...allBooks]);
        setIsBookLoaded(true);
    };

    /**
     * @description search for books that matched passed keyword
     * @param {string} sarchKeyword - search keyword
     */
    const bookSearch = (sarchKeyword) => {
        let res;
        setTimeout(async () => {
            if (sarchKeyword) {
                setIsBookLoaded(false);
                setSarchKeyword(() => sarchKeyword);
                try {
                    res = await search(sarchKeyword, 100);
                    if (res) {
                        res = res?.items ? [...res.items] : [...res];
                        console.log('res', res);
                        setSearchResullt(() => [...res]);
                    } else {
                        setSearchResullt(() => []);
                    }
                    setIsErrorHappen(false);
                } catch (e) {
                    setIsErrorHappen(true);
                }
            } else {
                setSarchKeyword("");
                setSearchResullt(() => []);
            }
            setIsBookLoaded(true);
        }, 500);
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
        // bookSearch(sarchKeyword);
        setAllBooks([...allBooks.filter((b) => b.id !== book.id), book]);
        setIsBookLoaded(true);
    };

    /**
     * @description get All books at first render
     */
    useEffect(() => {
        getAllBooks();
    }, []);


    return (
        <div className="search-books">
            {!isBookLoaded && <div className="loader"></div>}
            <div className="search-books-bar">
                <Link className="close-search" to="/">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={(e) => bookSearch(e.target.value)}
                    />
                </div>
            </div>
            {sarchKeyword && (
                <div className="search-books-results">
                    {isBookLoaded && searchResullt && searchResullt?.length > 0 && (
                        <ol className="books-grid">
                            {searchResullt.map((book) => {
                                return (
                                    <Book key={book.id} book={book} updateBook={updateBook} allBooks={allBooks} shelves={shelves} />
                                );
                            })}
                        </ol>
                    )}
                    {isBookLoaded && searchResullt && searchResullt?.length === 0 && (
                        <div className="text-center">there is no result mtached</div>
                    )}
                    {isErrorHappen && (
                        <div className="text-center">
                            something went wrong during serach please try another search
                            keyword
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
