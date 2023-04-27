import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ColorExtractor } from "react-color-extractor";
import { NavDetailPc } from "../components/Nav";
import Loading from "../components/Loading";
import styles from "./Detail.module.css";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  const handleColors = (colors) => {
    const left = colors.shift();
    const right = colors.pop();
    setColors([left, right]);
  };

  const yearsAgo = (year) => {
    const currentYear = new Date().getFullYear();
    const yearsAgo = currentYear - year;
    return yearsAgo;
  };

  const getUnit = (num) => {
    let units = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"];
    let decimal = 0;
    while (num >= 1000) {
      num /= 1000;
      decimal++;
    }
    return num.toFixed(2) + units[decimal];
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const theme = localStorage.getItem("isToggled");
        document.documentElement.setAttribute("color-theme", theme === null || theme === "false" ? "light" : "dark");
        const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        console.log(json);
        const movie = json.data.movie;
        setData(movie);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const hexToRgb = (hex) => {
      const rgb = hex
        .match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i)
        .slice(1)
        .map(function (v) {
          return parseInt(v, 16);
        });
      return "RGB(" + rgb.join(", ") + ")";
    };
    const setGradient = () => {
      const gradientLeft = document.querySelector(`.${styles.gradient__left}`);
      const gradientRight = document.querySelector(`.${styles.gradient__right}`);
      const leftHex = hexToRgb(colors[0]);
      const rightHex = hexToRgb(colors[1]);
      if (gradientLeft) {
        gradientLeft.setAttribute("style", `background-image: linear-gradient(-90deg, rgba(162, 68, 81, 0) 0%, ${leftHex} 100%);`);
      }
      if (gradientRight) {
        gradientRight.setAttribute("style", `background-image: linear-gradient(90deg, rgba(162, 68, 81, 0) 0%, ${rightHex} 100%);`);
      }
      const backgroundLeft = document.querySelector(`.${styles.poster__block} div:first-child`);
      const backgroundRight = document.querySelector(`.${styles.background__right}`);
      if (backgroundLeft) {
        backgroundLeft.setAttribute("style", `background: ${leftHex}`);
      }
      if (backgroundRight) {
        backgroundRight.setAttribute("style", `background: ${rightHex}`);
      }
    };
    if (colors.length > 0) {
      setGradient();
    }
  }, [colors]);

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <NavDetailPc />
        <section className={styles.content}>
          <div className={styles.mobile__wrapper}>
            <button className={[styles.mobile__button, styles.back__button].join(" ")} title="back" onClick={() => history.goBack()}>
              <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24">
                <path
                  className="fillTarget"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.4963 11.2497H6.31529L11.2853 6.27969C11.5783 5.98669 11.5783 5.51269 11.2853 5.21969C10.9923 4.92669 10.5173 4.92669 10.2253 5.21969L3.97529 11.4697C3.90529 11.5387 3.85029 11.6217 3.81229 11.7127C3.73729 11.8967 3.73729 12.1027 3.81229 12.2867C3.85029 12.3777 3.90529 12.4607 3.97529 12.5297L10.2253 18.7797C10.3713 18.9267 10.5623 18.9997 10.7553 18.9997C10.9473 18.9997 11.1393 18.9267 11.2853 18.7797C11.5783 18.4867 11.5783 18.0127 11.2853 17.7197L6.31529 12.7497H19.4963C19.9103 12.7497 20.2463 12.4137 20.2463 11.9997C20.2463 11.5857 19.9103 11.2497 19.4963 11.2497Z"
                  fill="white"
                ></path>
                <path
                  className="fillTarget"
                  d="M19.4963 11.2497H6.31529L11.2853 6.27969C11.5783 5.98669 11.5783 5.51269 11.2853 5.21969C10.9923 4.92669 10.5173 4.92669 10.2253 5.21969L3.97529 11.4697C3.90529 11.5387 3.85029 11.6217 3.81229 11.7127C3.73729 11.8967 3.73729 12.1027 3.81229 12.2867C3.85029 12.3777 3.90529 12.4607 3.97529 12.5297L10.2253 18.7797C10.3713 18.9267 10.5623 18.9997 10.7553 18.9997C10.9473 18.9997 11.1393 18.9267 11.2853 18.7797C11.5783 18.4867 11.5783 18.0127 11.2853 17.7197L6.31529 12.7497H19.4963C19.9103 12.7497 20.2463 12.4137 20.2463 11.9997C20.2463 11.5857 19.9103 11.2497 19.4963 11.2497"
                  stroke="white"
                  strokeWidth="0.5"
                ></path>
              </svg>
            </button>
            <button className={[styles.mobile__button, styles.share__button].join(" ")} title="share">
              <svg width="24" height="24" fill="#fff" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.6475 13.314C13.9492 13.314 13.3192 13.6015 12.8658 14.0631L6.98249 10.664C7.04166 10.4515 7.08333 10.2315 7.08333 9.99981C7.08333 9.76815 7.04166 9.54815 6.98333 9.33565L12.8658 5.93565C13.3192 6.39731 13.9492 6.68481 14.6475 6.68481C16.0275 6.68481 17.1475 5.56565 17.1475 4.18481C17.1475 2.80481 16.0275 1.68481 14.6475 1.68481C13.2675 1.68481 12.1475 2.80481 12.1475 4.18481C12.1475 4.41648 12.1892 4.63648 12.2483 4.84981L6.365 8.24898C5.91166 7.78731 5.28166 7.49981 4.58333 7.49981C3.20249 7.49981 2.08333 8.61898 2.08333 9.99981C2.08333 11.3806 3.20249 12.4998 4.58333 12.4998C5.28166 12.4998 5.91166 12.2123 6.365 11.7506L12.2483 15.1498C12.1892 15.3623 12.1475 15.5823 12.1475 15.814C12.1475 17.1948 13.2675 18.314 14.6475 18.314C16.0275 18.314 17.1475 17.1948 17.1475 15.814C17.1475 14.4331 16.0275 13.314 14.6475 13.314Z"
                  fill="white"
                ></path>
              </svg>
            </button>
          </div>
          <div className={styles.content__wrapper01}>
            {loading ? (
              <Loading />
            ) : colors.length === 0 ? (
              <div>
                <ColorExtractor
                  src={`https://cors-anywhere.herokuapp.com/${data.background_image_original}`}
                  getColors={handleColors}
                  onError={(error) => console.log(error)}
                ></ColorExtractor>
              </div>
            ) : (
              <div className={styles.content__wrapper02}>
                <section className={styles.content__exposed}>
                  <div className={styles.poster__container}>
                    <div className={styles.poster__block}>
                      <div className={styles.background__left}></div>
                      <div
                        className={styles.poster__img}
                        style={{ background: `url(${data.background_image_original}) center center/cover no-repeat` }}
                      >
                        <div className={styles.gradient__left}></div>
                        <div className={styles.gradient__right}></div>
                      </div>
                      <div className={styles.background__right}></div>
                      <div className={styles.dimmed__layer}></div>
                    </div>
                    <div className={styles.short__container}>
                      <div className={styles.short__wrapper01}>
                        <div className={styles.short__wrapper02}>
                          <div className={styles.short__wrapper03}>
                            <div className={styles.img__container}>
                              <img className={styles.img__cover} src={data.large_cover_image} alt="cover" />
                            </div>
                            <div className={styles.meta__container}>
                              <ul className={styles.meta__list}>
                                <li>
                                  Language<em>{data.language}</em>
                                </li>
                                <li>
                                  Release<em>{`${yearsAgo(data.year)} years ago`}</em>
                                </li>
                                <li>
                                  Download<em>{`${getUnit(data.download_count)}`}</em>
                                </li>
                              </ul>
                              <h1 className={styles.meta__title}>{data.title}</h1>
                              <div className={styles.meta__info}>
                                {data.year} ・ {data.genres.join("/")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.pane__container}>
                    <div className={styles.pane__wrapper01}>
                      <div className={styles.pane__wrapper02}>
                        <div className={styles.pane__wrapper03}>
                          <div className={styles.pane__meta}>
                            <h1 className={styles.pane__title}>{data.title}</h1>
                            <div className={styles.pane__info}>
                              {data.year} ・ {data.genres.join("/")}
                            </div>
                            <div className={styles.pane__rating}>Rating ★{data.rating}</div>
                            <div className={styles.pane__action}>Likes {data.like_count}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <div className={styles.dl}>
                  <div className={styles.dl__container}>
                    <div className={styles.dl__wrapper01}>
                      <div className={styles.dl__wrapper02}>
                        <div className={styles.dl__content}>
                          <section className={[styles.dl__exposed, styles.dl__moblie].join(" ")}>
                            <ul>
                              <li>
                                Release<em>{`${yearsAgo(data.year)} years ago`}</em>
                              </li>
                              <li>
                                Download<em>{`${getUnit(data.download_count)}`}</em>
                              </li>
                            </ul>
                          </section>
                          <section className={[styles.dl__exposed, styles.dl__padding].join(" ")}>
                            <div>
                              <div className={styles.dl__row}>
                                <header className={styles.dl__header}>
                                  <h2 className={styles.dl__subject}>INFOMATION</h2>
                                </header>
                              </div>
                            </div>
                            <div>
                              <div className={styles.dl__row}>
                                <article className={styles.dl__overview}>
                                  <div className={styles.dl__summary}>
                                    {data.title}
                                    <span className={styles.dl__meta}>
                                      {data.year} · {data.genres.join(", ")}
                                    </span>
                                    <span className={styles.dl__meta}>language · {data.language}</span>
                                  </div>
                                  <div className={styles.dl__story}>{data.description_full}</div>
                                </article>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Detail;
