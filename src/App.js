import { useState } from 'react';
import './App.css';
const {isbn10Checksum, isbn13Checksum} = require('isbn-check/src/isbn-check')

function App() {
  const [isbn, setISBN] = useState("")
  const [isValid, setIsValid] = useState(null)

  const checkISBN = () => {
    if (isbn.length <= 10) {
      let checksum = isbn10Checksum(isbn)
      if(checksum == "X") {
        setIsValid(true);
      }
      else if (checksum % 11 == 0) {
        console.log("zwei " +checksum);
        setIsValid(true)
      } 
      else {
        console.log("drei " +checksum);
        setIsValid(false)
      }
    } 
    else {
      console.log(isbn13Checksum(isbn))
    }
  }

  return (
    <div className="App">
      <input value={isbn} onChange={({target}) => setISBN(target.value)} />
      <button onClick={() => checkISBN()}>ISBN Check</button>
      {isValid === null ? null : isValid ? <p style={{color: 'green'}}>Ist Valide</p> : <p style={{color: 'red'}}>Ist nicht Valide.</p>}
    </div>
  );
}

export default App;
