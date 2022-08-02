const api = "https://reactnd-books-api.udacity.com";

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

/**
 * @description fetch specific book
 * @param {string} bookId - book id
 * @returns {Object} Book
 */
export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book);

/**
 * @description fetch all book
 * @returns {Array} Books
 */
export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then((res) => res.json())
    .then((data) => data.books);

/**
 * @description update Book shelf
 * @param {Object} book - book that want to update
 * @param {string} shelf - wanted shelf that want to move book to it
 */
export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json());

/**
 * @description search for books that matched passed keyword
 * @param {string} query - search keyword
 * @param {number} maxResults - max Results that will return as result
 */
export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, maxResults }),
  })
    .then((res) => res.json())
    .then((data) => data.books);
