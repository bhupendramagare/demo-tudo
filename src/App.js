import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { ref, uploadBytes } from "firebase/storage";

const App = () => {
  //read
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
  //read end

  // write ###############
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
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  // write end

  //delete########

  const deleteMovie = async (id) => {
    try {
      const movie = doc(db, "movies", id);
      await deleteDoc(movie);
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  //delete end

  //update ########

  const [updatedTitle, setUpdatedTitle] = useState("");

  const updateMovieTitle = async (id) => {
    try {
      const movie = doc(db, "movies", id);
      await updateDoc(movie, { title: updatedTitle });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };
  //end update

  // upload image on storage
  const [imgfile, setimgfile] = useState(null);

  const uploadImage = async () => {
    if (!imgfile) return;
    const fileFolderRef = ref(storage, `hello/${imgfile.name}`);
    try {
      await uploadBytes(fileFolderRef, imgfile);
    } catch (error) {
      console.error(error);
    }
  };

  // end

  return (
    <>
      <Auth />

      {/* write  */}
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
            style={{
              margin: "10px",
            }}
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
      {/* write end  */}

      {/* read  */}
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
              <button onClick={() => deleteMovie(movie.id)}>Delete</button>
              <input
                placeholder="Update movie title"
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <button onClick={() => updateMovieTitle(movie.id)}>
                Update Title
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* //upload image  */}
      <div>
        <h3>Upload Images</h3>
        <input type="file" onChange={(e) => setimgfile(e.target.files[0])} />
        <button onClick={uploadImage}>Upload File</button>
      </div>
    </>
  );
};

export default App;
