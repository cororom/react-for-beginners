import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

function Movie({ id, coverImg, title, year, genres, rating }) {
  return (
    <Link to={`/movie/${id}`}>
      <div className={styles.cover__wrapper01}>
        <div className={styles.cover__wrapper02}>
          <img className={styles.cover} src={coverImg} alt="cover" />
        </div>
      </div>
      <div className={styles.content__wrapper01}>
        <div className={styles.content__subject}>{title}</div>
        <div className={styles.content__playdate}>{year}</div>
        <div className={[styles.content__rate, styles.average].join(" ")}>
          <span>평균</span>
          <svg width="12" height="10" viewBox="0 0 12 10" xmlns="http://www.w3.org/2000/svg" fill="#555765" className={styles.rate__img}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6 8.02L3.14233 9.91131C2.91094 10.0644 2.61352 9.84836 2.68767 9.58097L3.60334 6.27872L0.921531 4.14536C0.704379 3.97262 0.817982 3.62299 1.0952 3.61087L4.51878 3.46128L5.719 0.251483C5.81619 -0.00842059 6.18381 -0.00842094 6.281 0.251483L7.48122 3.46128L10.9048 3.61087C11.182 3.62299 11.2956 3.97262 11.0785 4.14536L8.39666 6.27872L9.31233 9.58097C9.38648 9.84836 9.08906 10.0644 8.85767 9.91131L6 8.02Z"
            ></path>
          </svg>
          <span>{rating.toFixed(1)}</span>
        </div>
        <div className={styles.content__info}>
          <div className={styles.genres}>
            <div>{genres?.join(", ")}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Movie;
