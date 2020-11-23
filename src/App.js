import React from 'react';

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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     profiles: testData,
  //   };
  // }

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
      <header className="App-header">
        <StarGame />
        {/* <div>
           {this.props.title}
           <Form onSubmit={this.addNewProfile}/>
           <CardList list={this.state.profiles}/>
        </div> */}
      
      </header>
    </div>
  );
  }
}

export default App;
