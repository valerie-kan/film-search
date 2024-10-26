import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";

import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";
import axios from "axios";
import { options, url } from "../../components/Url/UrlInfo";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filmsList, setFilmsList] = useState([]);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const searchWord = searchParams.get("query");

  const onSearchMovie = (e) => {
    e.preventDefault();
    const query = e.target.elements.movieName.value;
    setSearchParams({ query });
  };

  useEffect(() => {
    const getFilmBySearchWord = async () => {
      if (!searchWord) return;
      try {
        setError(false);
        setLoading(true);
        const { data } = await axios.get(
          `${url}search/movie?include_adult=false&query=${searchWord}`,
          options
        );
        setFilmsList(data.results);
      } catch (error) {
        setError(true);
        setErrMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    getFilmBySearchWord();
  }, [searchWord]);

  return (
    <>
      <form onSubmit={onSearchMovie} className={css.searchForm}>
        <input
          type="text"
          name="movieName"
          placeholder="Enter search term..."
          autoComplete="off"
          className={css.searchWord}
        />
        <button type="submit" className={css.searchButton}>
          <BiSearchAlt />
        </button>
      </form>
      {loading && <Loader />}
      {error ? (
        <ErrorMessage errMessage={errMessage} />
      ) : (
        <MovieList filmsList={filmsList} />
      )}
    </>
  );
};

export default MoviesPage;
