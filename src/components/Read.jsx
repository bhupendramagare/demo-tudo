import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const Read = () => {
  const [movieList, setMovieList] = useState([]);

  const movieCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    // READ THE DATA
    // SET THE MOVIE LIST
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "yellow",
        }}
      >
        {movieList.map((movie) => (
          <div
            className="box"
            style={{
              backgroundColor: "orange",
              margin: "10px 0",
              textAlign: "center",
            }}
            key={movie.id}
          >
            <h3
              style={{
                color: movie.receivedAnOSCUR ? "green" : "red",
              }}
            >
              {movie.title}
            </h3>
            <p>Release Year : {movie.year}</p>
            <p
              style={{
                backgroundColor: movie.receivedAnOSCUR ? "green" : "red",
                color: "white",
              }}
            >
              {movie.receivedAnOSCUR
                ? "YES!, Movie Received An OSCUR."
                : "NO!, Movie not qualify for OSCUR."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
