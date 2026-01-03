// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store'; // The RTK configured store with dynamic injection
import App from './App';
// import Counter from './components/Counter';
// import UserComponent from './components/UserComponent';
// import DataComponent from './components/DataComponent';
// import TodosComponent from './components/Todos';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    {/* <Counter />
    <UserComponent />
    <DataComponent />
    <TodosComponent /> */}
    <Router>
      <App />
    </Router>
  </Provider>
);