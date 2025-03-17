import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import axios from "axios";
import css from "./HomePage.module.css";
import { url, options } from "../../components/Url/UrlInfo";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const [filmsList, setFilmsList] = useState([]);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    const fetchTrendingFilms = async () => {
      try {
        setError(false);
        const response = await axios.get(
          `${url}trending/movie/day?include_adult=false&language=en-US`,
          options
        );
        setFilmsList(response.data.results);
      } catch (error) {
        setError(true);
        setErrMessage(error.message);
      }
    };
    fetchTrendingFilms();
  }, []);

  return (
    <>
      {error ? (
        <ErrorMessage errMessage={errMessage} />
      ) : (
        <div className={css.filmListCont}>
          <h1 className={css.title}>Trending today</h1>
          <MovieList filmsList={filmsList} />
        </div>
      )}
    </>
  );
};

export default HomePage;
