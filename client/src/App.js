import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import Login from "./components/Login";
import "./styles.scss";
import BubblesPage from "./components/BubblePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path= '/bubblesPage' component= {BubblesPage} />
      </div>
    </Router>
  );
}

export default App;
