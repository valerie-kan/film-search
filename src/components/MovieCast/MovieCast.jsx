import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import css from "./MovieCast.module.css";
import { url, options, baseImgUrl } from "../Url/UrlInfo";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

import noImg from "../../assets/noImg.jpg";

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState(null);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setError(false);
        setLoading(true);
        const { data } = await axios.get(
          `${url}movie/${movieId}/credits`,
          options
        );
        setMovieCast(data.cast);
      } catch (error) {
        setError(true);
        setErrMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {error ? (
        <ErrorMessage errMessage={errMessage} />
      ) : (
        <ul className={css.castList}>
          {movieCast &&
            movieCast.slice(0, 12).map((cast) => (
              <li key={cast.id} className={css.castItem}>
                <div className={css.imgCont}>
                  <img
                    src={
                      cast.profile_path
                        ? `${baseImgUrl}${cast.profile_path}`
                        : noImg
                    }
                    alt="Photo of an actor"
                    width="120"
                    height="160"
                    className={css.actorPic}
                  />{" "}
                </div>
                <p className={css.actorText}>{cast.original_name}</p>
                <p className={css.actorText}>
                  <span className={css.span}>Character: </span>
                  {cast.character}
                </p>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
