import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { options, url } from "../Url/UrlInfo.js";
import css from "./MovieReviews.module.css";
import Loader from "../Loader/Loader.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [reviewsAreEmpty, setReviewsAreEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setError(false);
        setLoading(true);
        const { data } = await axios.get(
          `${url}movie/${movieId}/reviews`,
          options
        );
        if (data.results.length === 0) {
          setReviewsAreEmpty(true);
        } else {
          setMovieReviews(data.results);
          setReviewsAreEmpty(false);
        }
      } catch (error) {
        setError(true);
        setErrMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {error ? (
        <ErrorMessage errMessage={errMessage} />
      ) : (
        <ul className={css.reviewList}>
          {reviewsAreEmpty ? (
            <p className={css.emptyText}>
              There are no reviews for this movie yet!
            </p>
          ) : (
            movieReviews.map((review) => (
              <li key={review.id} className={css.reviewInfo}>
                <p className={css.reviewAuthor}>Author: {review.author}</p>
                <p className={css.reviewText}>{review.content}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;
