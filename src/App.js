import "./App.css";
import BookList from "./componnets/BookList";
import { Route, Routes } from "react-router-dom";
import Search from "./componnets/Search";

/**
 * @description render App
 * @returns {Component} full App
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<BookList />}></Route>
      <Route path="/search" element={<Search />}></Route>
    </Routes>
  );
}

export default App;
