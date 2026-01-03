import React from "react";
// import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import store from "./redux/store/index.js"; // The configured store
import App from "./App.jsx";

// import { StrictMode } from 'react'
// import './index.css'
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  //   <StrictMode>
  //     <App />
  //   </StrictMode>,
  <Provider store={store}>
    <App />
  </Provider>
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   // The Provider makes the Redux store available to any connected components
//   <Provider store={store}>
//     <App />
//   </Provider>
// )
