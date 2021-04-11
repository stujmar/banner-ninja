import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Home from "./components/home/Home";
import About from "./components/about/About";
import './App.css';
//import Card from './components/Card.js';
// import CardList from './components/CardList';
// import Form from './components/Form';
// import Switcher from './components/Switcher';
import StarGame from './components/StarGame';

	const testData = [
			{name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
      {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  		{name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
	];


class App extends React.Component {

state = {
  profiles: testData,
};

addNewProfile = (profileData) => {
  this.setState(prevState => ({
    profiles: [...prevState.profiles, profileData]
  }));
};

  render() {
  return (
    <div className="App">
      <header className="bg-blue-600 h-36 flex items-center justify-center text-lg font-sans text-white">
        <p>Welcome to my Create React App</p>
      </header>
      <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/stargame">Star Game</Link>
          </li>
        </ul>
        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
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
  );
  }
}

export default App;
