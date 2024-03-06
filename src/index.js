import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Replace with the path to your main component

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
