import React, { useEffect, useState } from "react";
import "./Title.css";
import axios from "axios";
import Nav from "../../components/Nav/Nav"
import Footer from "../../components/Footer/Footer"
import { useParams, useNavigate } from "react-router-dom";


const Title = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [titleData, setTitleData] = useState();
  const [loading, setLoading] = useState(true);

  async function getTitleData() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=406892b9&i=${id}`
    );
    setTitleData(data);
    setLoading(false);
  }

  useEffect(() => {
    getTitleData();
  }, []);

  return (
    <>
      <Nav/>
      <div className="title-page">
        <div className="back">
          <img className="back__arrow" src="/assets/arrowleft.png" onClick={()=>navigate("/search")} alt="" />
        </div>
      {loading ? (
        <div className="loading">
          <img className="spinner" src="/assets/loading.png"></img>
        </div>
      ) : (
        <div className="title__container">
          <div className="title">
            <div className="title__poster">
              <img className="title__poster--img"
                src={titleData.Poster}
                onError={(e) => {
                  e.target.src = "/assets/notavail.png";
                }}
              />
            </div>
            <div className="title__info">
              <h3 >{titleData.Title}</h3>
              <p>Released: {titleData.Released}</p>
              <p>{titleData.Type[0].toUpperCase() + titleData.Type.slice(1)}</p>
              <p>{titleData.Rated}</p>
            </div>
          </div>
          <div className="title__more-info">
            <div className="gen">
              <h3 >Plot</h3>
              <p>{titleData.Plot}</p>
              <h3 >Details</h3>
              <p>{titleData.Genre}</p>
              <p><span className="bright">Starring</span> {titleData.Actors}</p>
              <p> <span className="bright">Written by</span> {titleData.Writer}</p>
              <p><span className="bright">Directed by</span> {titleData.Director}</p>
              <p>{titleData.Runtime}</p>
              <p>{titleData.Country}</p>
            </div>
            <div className="awards">
              <h3 >Reception</h3>
              <p>Box Office: {titleData.BoxOffice} </p>
              <p>Awards: {titleData.Awards}</p>
            </div>
            <div className="ratings">
              <h3 >Reviews</h3>
              <p>Metascore: {titleData.Metascore} / 100</p>
              <p>
                IMDb Rating: {titleData.imdbRating} / 10 , Votes:{" "}
                {titleData.imdbVotes}{" "}
              </p>
              <p>
                Rotten Tomatoes: {titleData.Ratings.length > 1? (titleData.Ratings[1].Value) : "N/A"} </p>
            </div>
          </div>
        </div>
      )}
      </div>
      <Footer/>
    </>
  );
};

export default Title;
