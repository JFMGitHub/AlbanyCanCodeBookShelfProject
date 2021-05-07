import { useState, useEffect } from "react";
import axios from "axios";

function Bookshelf({ token, logout }) {
  const [books, setBooks] = useState({
    wantToRead: [],
    currentlyReading: [],
    read: []
  });
  const [errorMessage, setErrorMessage] = useState("");

  const bookShelfPage = async () => {
    try {
      const response = await axios("http://localhost:3001/api/bookshelf", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      setBooks(response.books);
    } catch (error) {
      console.error(error);
      setErrorMessage("Oh no! An unexpected error occurred.");
    }
  };

  useEffect(() => {
    bookShelfPage();
  }, []);

  return (
    <div className="container mt-2 mb-5">
      <div className="d-flex justify-content-between">
        <h1 className="h2">Bookshelf</h1>
        <button type="button" className="btn btn-primary mb-2" onClick={logout}>
          Logout
        </button>
      </div>
      {/* {books.map((book) => {
        const key = `user-${book.}`;
        const name = `${book} ${book}`;
        return (
          <div key={key}>
            <img src={book.} alt={} />
            <p>{}</p>
          </div>
        ); */}
      })}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default Bookshelf;
