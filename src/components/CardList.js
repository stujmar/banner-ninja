import React from "react";
import Card from "./Card";

const CardList = (props) => {
    return (
    <div>
    {props.list.map(profile => <Card key={profile.id} {...profile}/>)}
    </div>
    )

}

export default CardList;