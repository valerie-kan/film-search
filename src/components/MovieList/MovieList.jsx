import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ filmsList }) => {
  const location = useLocation();

  return (
    <ul>
      {filmsList.map((film) => (
        <li className={css.filmItem} key={film.id}>
          <Link
            to={`/movies/${film.id}`}
            state={location}
            className={css.filmLink}
          >
            {film.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
