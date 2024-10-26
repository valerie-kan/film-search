import clsx from "clsx";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const linkClasses = ({ isActive }) => {
  return clsx(css.mainLink, isActive && css.active);
};

export const Navigation = () => {
  return (
    <header className={css.header}>
      <NavLink className={linkClasses} to="/">
        Home
      </NavLink>
      <NavLink className={linkClasses} to="/movies">
        Movies
      </NavLink>
    </header>
  );
};
