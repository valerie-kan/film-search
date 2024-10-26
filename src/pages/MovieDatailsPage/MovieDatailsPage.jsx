import {
  NavLink,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import { CgArrowLeft } from "react-icons/cg";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import css from "./MovieDatailsPage.module.css";
import clsx from "clsx";
import { url, options } from "../../components/Url/UrlInfo";
import MovieDetails from "../../components/MovieDatails/MovieDetails";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const buildAddInfoLink = ({ isActive }) => {
  return clsx(css.addInfoLink, isActive && css.active);
};

const MovieDatailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setError(false);
        setLoading(true);
        const { data } = await axios.get(`${url}movie/${movieId}`, options);
        setMovieDetails(data);
      } catch (error) {
        setError(true);
        setErrMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const backLink = location.state ?? "/movies";
  console.log(location);

  return (
    <>
      <Link to={backLink} className={css.goBackLink}>
        <CgArrowLeft />
        Go back
      </Link>

      {loading && <Loader />}
      {error ? (
        <ErrorMessage errMessage={errMessage} />
      ) : (
        <>{movieDetails && <MovieDetails movieDetails={movieDetails} />}</>
      )}
      <section className={css.addInfoSection}>
        <p className={css.addInfoTtl}>Additional information</p>
        <div>
          <NavLink to="cast" state={backLink} className={buildAddInfoLink}>
            Cast
          </NavLink>
          <NavLink to="reviews" state={backLink} className={buildAddInfoLink}>
            Reviews
          </NavLink>
        </div>
        <Suspense>
          <Outlet />
        </Suspense>
      </section>
    </>
  );
};

export default MovieDatailsPage;
