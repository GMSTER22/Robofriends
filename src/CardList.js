import React from "react";
import Card from "./Card";

const CardList = (props) => {
    return (
        props.robotList.map(robot => {
            const { id, name, email } = robot;
            return (<Card key={id} id={id} name={name} email={email} />)
        })
    )
}

export default CardList;
