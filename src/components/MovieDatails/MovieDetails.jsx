import { baseImgUrl } from "../Url/UrlInfo";
import css from "./MovieDetails.module.css";

const MovieDetails = ({ movieDetails }) => {
  return (
    <section className={css.aboutFilmSection}>
      <div>
        <img
          src={`${baseImgUrl}${movieDetails.poster_path}`}
          alt={movieDetails.title}
          width="300"
          height="400"
          className={css.img}
        />
      </div>
      <div className={css.filmInfo}>
        <h2>{movieDetails.title}</h2>
        <p className={css.overviewTtl}>Overview</p>
        <p className={css.overviewText}>{movieDetails.overview}</p>
        <p>
          <span className={css.span}>Genres: </span>
          {movieDetails.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p>
          <span className={css.span}>Country: </span>
          {movieDetails.production_countries
            .map((country) => country.name)
            .join(", ")}
        </p>
        <p>
          <span className={css.span}>Vote average: </span>
          {movieDetails.vote_average}
        </p>
        <p>
          <span className={css.span}>Release date: </span>
          {movieDetails.release_date}
        </p>
      </div>
    </section>
  );
};

export default MovieDetails;
