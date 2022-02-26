import React, { Component } from "react";
import CardList from "./CardList";
import SearchBox from "./SearchBox"
import {robots} from "./robots";
import "./App.css"


class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ""
        }
    }

    async componentDidMount() {
        try {
            let usersUrl = "https://jsonplaceholder.typicode.com/users";

            const res = await fetch(usersUrl);
            let users = await res.json();

            this.setState( { robots: users })
        } catch(error) {
            console.log(error)
        }
    }
    
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    render() {
        const filterRobots = this.state.robots.filter(robot => { 
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());             
        })

        return (
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <CardList robotList={filterRobots} />
            </div>
        )
    }
}

export default App;