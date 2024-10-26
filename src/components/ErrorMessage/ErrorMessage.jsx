import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ errMessage }) => {
  return <p className={css.error}>{errMessage}</p>;
};

export default ErrorMessage;
