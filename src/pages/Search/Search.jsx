import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import Nav from "../../components/Nav/Nav";

const Search = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const resultsTitle = document.querySelector(".results");
  const [fetchData, setFetchData] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("one");
  const [rawData, setRawData] = useState()

  async function getData() {
    setLoading(true)
    const { data } = await axios.get(
      `https://www.omdbapi.com/?i=tt3896198&apikey=406892b9&s=${searchValue}&page=${page}`
    );
    setFetchData(data.Search);
    setRawData(data)
    setLoading(false);
  }

  function search() {
    setLoading(true);
    getData();
    resultsTitle.innerHTML = `Showing Results for "${searchValue}"`; 
  }

  function rightArrow() {
    if(page < Math.round(rawData.totalResults/10))
    {
      setPage(page + 1)
    }
  }
  function leftArrow() {
    if(page > 1) {
      setPage(page - 1)
    }
  }

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <>
      
      <Nav/>

      <section id="search">

        <div className="top__text">
          <p>Browse Titles</p>
          <input
            type="text"
            placeholder="Search by Title"
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
          >
          </input>
          <button className="searchBtn">
            <img
              src="/assets/search.png"
              onClick={() => search()}
            ></img>
          </button>
        </div>

        <div className="results"></div>
        <div className="container">
          {loading ? (
            <div className="loading">
              <img
                className="spinner"
                src="/assets/loading.png"
              ></img>
            </div>
          ) : (
            <>
              {fetchData? (fetchData.map((movie) => (
                <div className="movie__template" key={movie.imdbID}
                onClick={()=>navigate(`${movie.imdbID}`)}>
                    <img className="movie__poster"
                      src={movie.Poster}
                      onError={(e) => {
                        e.target.src = "/assets/notavail.png";
                      }}
                    />
                  <div className="movie__details">
                  <h3 className="movie__title">{movie.Title}</h3>
                  <div className="movie__year">{movie.Year}</div>
                  <div className="movie__category">
                    {movie.Type[0].toUpperCase() + movie.Type.slice(1)}
                  </div>
                  </div>
                </div>) 
              )) :
              (<p className="error__message">❌ Could not load results. Try your search again.</p>)}
            </>
          )}
          <div className="arrows">
            <img src="/assets/arrowleft.png" onClick={()=>leftArrow()} alt="" />
            <p>Page {page}</p>
            <img src="/assets/arrowright.png" onClick={()=>rightArrow()} alt="" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Search;
