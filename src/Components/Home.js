import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [search, setSearch] = useState("");

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${search}&apikey=4a3b711b&page=${(
          currentPage / 2
        ).toFixed()}`
      );
      setMovies(response.data.Search || []);
      setTotalResults(response.data.totalResults);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage, search]);

  const totalPages = totalResults / 5;

  const displayMovies = () => {
    if (currentPage % 2 !== 0) {
      // Display the first 5 elements
      return movies.slice(0, 5).map((movie) => (
        <div className="col-3 gy-5" key={movie.imdbID}>
          <div className="card">
            <Link to={`movie/${movie.imdbID}`} key={movie.imdbID} >
              <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
            </Link>

            <div className="card-body">
              <h5 className="card-title">{movie.Title}</h5>
              <p className="card-text">
                Year : {movie.Year} | Type : {movie.Type}
              </p>
            </div>
          </div>
        </div>
      ));
    } else {
      // Display the next 5 elements
      return movies.slice(5, 10).map((movie) => (
        <div className="col-3 gy-5" key={movie.imdbID}>
          <div className="card">
          <Link to={`movie/${movie.imdbID}`} key={movie.imdbID} >
              <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
            </Link>

            <div className="card-body">
              <h5 className="card-title">{movie.Title}</h5>
              <p className="card-text">
                Year : {movie.Year} | Type : {movie.Type}
              </p>
            </div>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="container">
      <div className="my-2">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      {search !== "" ? (
        <>
          {totalResults
            ? totalResults + " result found for " + search
            : "OOPS !! No Result Found"}
          <div className="row mb-5">{displayMovies()}</div>
        </>
      ) : (
        "Search Title"
      )}

      {/* pages */}
      <div className="pb-5">
        {totalPages > 1 ? (
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-secondary me-2"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {Math.round(totalPages)}
            </span>
            <button
              className="btn btn-secondary ms-2"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
