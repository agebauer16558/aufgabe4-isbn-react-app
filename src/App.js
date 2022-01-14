import { useState } from "react";
import "./App.css";
const { isbn10Checksum, isbn13Checksum } = require("isbn-check/src/isbn-check");
const nodeIsbn = require("node-isbn");

function App() {
  const [isbn, setISBN] = useState("");
  const [book, setBook] = useState(null);
  const [isValid, setIsValid] = useState(null);

  const fetchData = () => {
    nodeIsbn
      .provider(["openlibrary", "google"])
      .resolve(isbn)
      .then(function (book) {
        console.log(book);
        setBook(book);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const checkISBN = () => {
    if (isbn.length <= 10) {
      let checksum = isbn10Checksum(isbn);
      if (checksum === "X") {
        setIsValid(true);
        fetchData();
      } else if (checksum % 11 === 0) {
        setIsValid(true);
        fetchData();
      } else {
        setIsValid(false);
      }
    } else {
      const isbn12 = isbn.substring(0, isbn.length - 1);
      const checksum = isbn13Checksum(isbn12);

      if (checksum === Number(isbn[12])) {
        setIsValid(true);
        fetchData();
      } else {
        setIsValid(false);
      }
    }
  };

  return (
    <div className="App">
      <input value={isbn} onChange={({ target }) => setISBN(target.value)} />
      <button onClick={() => checkISBN()}>ISBN Check</button>
      {isValid === null ? null : isValid ? (
        <p style={{ color: "green" }}>Ist Valide</p>
      ) : (
        <p style={{ color: "red" }}>Ist nicht Valide.</p>
      )}

      {book && (
        <>
          <h1>{book.title}</h1>
          <h2>{book.authors ? book.authors[0] : "Autor unbekannt"}</h2>
          <p>{book.description}</p>
          {book.imageLinks.thumbnail ? (
            <img src={book.imageLinks.thumbnail} alt="cover" />
          ) : (
            <p>Kein Cover gefunden</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
