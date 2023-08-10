import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const Write = () => {
  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieYear, setNewMovieYear] = useState(0);
  const [newMovieOscur, setNewMovieOscur] = useState(false);

  //collection reference
  const moviesCollectionRef = collection(db, "movies");

  const onSubmitHandler = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        year: newMovieYear,
        receivedAnOSCUR: newMovieOscur,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        margin: "100px",
        backgroundColor: "lightblue",
      }}
    >
      <div className="container">
        <input
          type="text"
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release year..."
          onChange={(e) => setNewMovieYear(Number(e.target.value))}
        />
        <label htmlFor="check">Received An OSCUR</label>
        <input
          type="checkbox"
          id="check"
          checked={newMovieOscur}
          onChange={(e) => setNewMovieOscur(e.target.checked)}
        />
        <button onClick={onSubmitHandler}>ADD MOVIE</button>
      </div>
    </div>
  );
};

export default Write;
