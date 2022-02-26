import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox"
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
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

            setTimeout( () => this.setState( { robots: users }) ,1000);
            // this.setState( { robots: users } )
            
        } catch(error) {
            console.log(error)
        }
    }
    
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    render() {
        const { robots, searchfield } = this.state;

        const filterRobots = robots.filter(robot => { 
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());             
        })

        //using template literal for conditional rendering
        return !robots.length ?
        (
            <div className="flex items-end justify-center">
                <h1>Loading...</h1>
            </div>
        ) : (
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robotList={filterRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        )
    }
}

export default App;