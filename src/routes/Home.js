import { useState, useEffect, useMemo, useCallback } from "react";
import { NavHomePc, NavHomeMobile } from "../components/Nav";
import Loading from "../components/Loading";
import Movie from "../components/Movie";
import Slide from "../components/Slide";
import styles from "./Home.module.css";

function Home() {
  const api = useMemo(
    () => [
      { key: 1, title: "TOP MOVIES", url: `minimum_rating=8.8&sort_by=rating` },
      { key: 2, title: "COMEDY", url: `genre=comedy&sort_by=year` },
      { key: 3, title: "THRILLER", url: `genre=thriller&sort_by=year` },
      { key: 4, title: "ROMANCE", url: `genre=romance&sort_by=year` },
    ],
    []
  );
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const checkImageExists = async (imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  };

  const loadImage = useCallback(async (imageUrl) => {
    const imageExists = await checkImageExists(imageUrl);
    if (imageExists) {
      return true;
    } else {
      return false;
    }
  }, []);

  const getMovies = useCallback(async () => {
    try {
      const json = await Promise.all(
        api.map(async ({ title, url }) => {
          const data = await (await fetch(`https://yts.mx/api/v2/list_movies.json?${url}&limit=12`)).json();
          data["data"]["title"] = title;
          return data;
        })
      );
      let rows = [];
      await Promise.all(
        json.map(async (value) => {
          if (value.status !== "ok") return null;
          const promises = await Promise.all(
            value.data.movies.map(async (item) => {
              const result = await loadImage(item.medium_cover_image);
              if (result === false) {
                return null;
              }
              return item;
            })
          );
          const filteredMovies = promises.filter((item) => item !== null);
          value.data.movies = filteredMovies;
          rows.push(value.data);
        })
      );
      setMovies(rows);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [api, loadImage]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <NavHomePc />
        <NavHomeMobile />
        <section className={styles.content}>
          <div className={styles.content__layout}>
            <section className={styles.content__section}>
              {loading ? (
                <Loading />
              ) : (
                <div>
                  {movies.map((row, index) => (
                    <div className={styles.content__row} key={index}>
                      <div className={styles.content__titleWrapper}>
                        <h2 className={styles.content__title}>{row.title}</h2>
                      </div>
                      <div className={styles.content__container}>
                        <div className={styles.content__wrapper01}>
                          <div className={styles.content__wrapper02}>
                            <div className={styles.content__wrapper03}>
                              <div className={styles.content__wrapper04}>
                                <ul className={index % 2 === 0 ? styles.content__list : styles.content__listSm}>
                                  {row.movies.map((movie) => {
                                    return (
                                      <li className={styles.content__item} key={movie.id}>
                                        <Movie
                                          key={movie.id}
                                          id={movie.id}
                                          coverImg={movie.medium_cover_image}
                                          title={movie.title}
                                          year={movie.year}
                                          genres={movie.genres}
                                          rating={movie.rating}
                                        />
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </div>
                          </div>
                          <Slide type={index % 2 === 0 ? "basic" : "small"} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
