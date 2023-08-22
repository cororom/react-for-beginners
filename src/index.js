import React from "react";
// import ReactDOM from "react-dom/client"; // react v18 버전용
import ReactDOM from 'react-dom';
import App from "./App";
import "./styles.css";

// react v18 버전용
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
