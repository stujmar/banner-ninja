import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

import Home from "./components/home/Home";
import About from "./components/about/About";
import StarGame from './components/StarGame';
import Nav from './components/nav/Nav';
import SeedPlanter from './components/seed/SeedPlanter';

import AboutPage from './components/temp/AboutPage';
import HomePage from './components/temp/HomePage';
import Header from './components/Header';

const App = () => {

  function getPage() {
    const route = window.location.pathname;
    console.log(route);
    if (route === "/about") return <AboutPage />;
    return <HomePage />;
  }
  return (
    <div className="App">
      <header className="bg-blue-600 h-36 flex items-center justify-center text-lg font-sans text-white">
        <p>Welcome to my Create React App</p>
      </header>
      <Header />
      {getPage()}
      <Router>
      <div className="box-border">
      <Nav />
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
          <Route path="/seed-planter">
            <SeedPlanter />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  )
}

export default App;
