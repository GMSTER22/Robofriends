import React, { useEffect, useState } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox"
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css"


// class App extends Component {
//     constructor() {
//         super();
//         this.state = {
//             robots: [],
//             searchfield: ""
//         }
//     }
function App(props) {

    const [ robots, setRobots ] = useState([]);
    const [ searchfield, setSearchfield ] = useState("");

    useEffect( () => {
        let usersUrl = "https://jsonplaceholder.typicode.com/users";

        fetch(usersUrl)
        .then(res => res.json())
        .then(users => {setRobots(users)})
        .catch(error => console.log(error))

        //using setTimeout to test my if statement in the return bracket
        // setTimeout( () => setRobots(users) ,1000);
        // this.setState( { robots: users } )
    },[])
    
    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
        // this.setState({ searchfield: event.target.value });
    }

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
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
                <ErrorBoundry>
                    <CardList robotList={filterRobots} />
                </ErrorBoundry>
            </Scroll>
        </div>
    )
}

export default App;