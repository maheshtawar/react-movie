// https://www.omdbapi.com/?apikey=4a3b711b&i=tt0145487
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MovieDetails(props) {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  const fetchMovie = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=4a3b711b&i=${id}`
      );
      setMovie(response.data || {});
    } catch (error) {
      console.error('Error fetching movie:', error);
    }
  };

  useEffect(() => {
      fetchMovie();
  }, []);

  console.log(movie, Object.values(movie).length);

  return (
    <>
      {Object.values(movie).length > 0 ? (
        <div className="mb-3 mx-auto my-2" style={{ width: '80%' }} data-bs-theme={props.isChecked?"dark":"light"}>
          <div className="row g-0 my-auto">
            <div className="col-md-4">
              <img
                src={movie.Poster}
                className="img-fluid rounded-start"
                alt={movie.Title}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1 className="card-title"> <em> {movie.Title} </em> </h1>
                {/* <p className="card-text">{movie.Plot}</p> */}
                <p className="card-text">
                  <strong>Director:</strong> {movie.Director}
                </p>
                <p className="card-text">
                  <strong>Actors:</strong> {movie.Actors}
                </p>
                <p className="card-text">
                  <strong>Genre:</strong> {movie.Genre}
                </p>
                <p className="card-text">
                  <strong>Language:</strong> {movie.Language}
                </p>
                <p className="card-text">
                  <strong>Runtime:</strong> {movie.Runtime}
                </p>
                <p className="card-text">
                  <strong>Released:</strong> {movie.Released}
                </p>
                <p className="card-text">
                  <strong>IMDb Rating:</strong> {movie.imdbRating}
                </p>
                <p className="card-text">
                  <strong>Box Office:</strong> {movie.BoxOffice}
                </p>
                <p className="card-text">
                  <strong>Awards:</strong> {movie.Awards}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center my-2">Loading...</div>
      )}
    </>
  );
}
