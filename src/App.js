import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";

import './App.css';

import Home from "./components/home/Home";
import About from "./components/about/About";
import StarGame from './components/StarGame';

const App = () => {

  return (
    <div className="App">
      <header className="bg-blue-600 h-36 flex items-center justify-center text-lg font-sans text-white">
        <p>Welcome to my Create React App</p>
      </header>
      <Router>
      <div className="box-border">
        <div className="flex justify-around">
            <NavLink exact className="flex-grow bg-blue-400 py-2 px-4 text-blue-50 hover:bg-gray-50 hover:text-gray-500" to="/" activeClassName="border-b-4">Home</NavLink>
            <NavLink exact className="flex-grow bg-blue-400 py-2 px-4 text-blue-50 hover:bg-gray-50 hover:text-gray-500" to="/about" activeClassName="border-b-4">About</NavLink>
            <NavLink exact className="flex-grow bg-blue-400 py-2 px-4 text-blue-50 hover:bg-gray-50 hover:text-gray-500" to="/stargame" activeClassName="border-b-4">Star Game</NavLink>
        </div>
        <hr />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/stargame">
            <StarGame />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  )
}

export default App;
