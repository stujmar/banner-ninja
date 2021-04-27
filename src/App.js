import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';

import Home from "./components/home/Home";
import About from "./components/about/About";
import StarGame from './components/StarGame';
import Nav from './components/nav/Nav';
import SeedPlanter from './components/seed/SeedPlanter';
import Course from './components/temp/Course';

import Header from './components/Header';
import CoursesPage from './components/temp/CoursesPage';
import Example from './components/temp/Example';
import NotFoundPage from './components/temp/NotFoundPage';
import YouLose from './components/YouLose';

const App = () => {

  return (
    <div className="App">
      <header className="bg-blue-600 h-36 flex items-center justify-center text-lg font-sans text-white">
        <p>Welcome to my Create React App</p>
      </header>
      <Header />
      <Example />
      <CoursesPage />
      <div className="box-border">
      <Nav />
        <hr />
        <Switch>
          {/* <Route exact path="/">
            <Home />
          </Route> */}
          <Route path="/" component={Home} exact />
          <Route path="/you-lose" component={YouLose} exact />
          <Route path="/course/:id" component={Course} id="10" exact />
          <Route path="/about">
            <About />
          </Route>
          <Route path="/stargame">
            <StarGame />
          </Route>
          <Route path="/seed-planter">
            <SeedPlanter />
          </Route>
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  )
}

export default App;
