import { Link } from "react-router-dom";

import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <>
      <p className={css.notFoundText}>The page is not found!</p>
      <Link to="/" className={css.notFoundLink}>
        Go to home page
      </Link>
    </>
  );
};

export default NotFoundPage;
