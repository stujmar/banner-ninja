import React from "react";
//import { findRenderedDOMComponentWithTag } from "react-dom/test-utils";

class Form extends React.Component {
state = {
    userName: ''
};

handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await
    axios.get(`https://api.github.com/users/${this.state.userName}`);
    // fetch(`https://api.github.com/users/${this.state.userName}`);
    console.log(resp);
    console.log(resp.data);
    console.log(this.state.userName);
};
//userNameInput = React.createRef();

render() {
    return (
        <form onSubmit={this.handleSubmit} action="">
            <input 
                type="text" 
                value={this.state.userName}
                //Event listener setting the state to the input and updating the value accordningly
                onChange={event => this.setState({userName: event.target.value})}
                placeholder="GitHub Username" 
                required/>
            <button>Add Card</button>
        </form>
    )
}

}

export default Form;