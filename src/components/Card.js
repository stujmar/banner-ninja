import React from "react";

class Card extends React.Component {
render() {
    return (
    <div className="github-profile">
        <img className="profile-pic" src={this.props.avatar_url} alt="github profile pic" />
        <div className="info">
            <div className="name" style={{fontSize: "150%"}}>{this.props.name}</div>
    <div className="company">{this.props.company}</div>
        </div>
    </div>
    )
}

}

export default Card