import React from 'react';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import faker from 'faker'
import Room from './Room'
import Start from './Start'

class App extends React.Component {
    screens = {
        lobby: 0,
        room: 1
    };

    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.getItem("userName") || faker.name.firstName(),
            screen: localStorage.getItem("room") === null ? this.screens.lobby : this.screens.room,
            room: localStorage.getItem("room") || -1,
            clientID: localStorage.getItem('clientID') || -1
        };

        // window.addEventListener('beforeunload', () => {
        //     navigator.sendBeacon('https://klaverjas.local/client/' + this.state.clientID + '/logout');
        // });
    }

    windowsResized = () => {
        this.setState({resize: window.innerHeight + window.innerWidth});
    };

    screenChange = (screen) => {
        this.setState({screen: screen})
    };


    toRoom = (id) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: this.state.name })
        };
        fetch('https://klaverjas.local/client/add', requestOptions)
            .then(result => result.json())
            .then(json => {
                this.setState({clientID: parseInt(json.id)});
                localStorage.setItem("clientID", json.id);
            });

        this.setState({room: id});
        this.screenChange(this.screens.room);
        localStorage.setItem("room", id);
    };

    toLobby = () => {
        this.screenChange(this.screens.lobby);
        localStorage.removeItem("room")
    };

    nameChange = (event) => {
        this.setState({name: event.target.value, clientID: -1});
        localStorage.setItem("userName", event.target.value);
        localStorage.removeItem("clientID");
    };

    componentDidMount() {
        window.addEventListener('resize', this.windowsResized);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowsResized);
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.screen === this.screens.lobby &&
                <Start
                    name={this.state.name}
                    handler={this.nameChange}
                    screenChange={this.screenChange}
                    toRoom={this.toRoom}/>
                }
                {
                    this.state.screen === this.screens.room &&
                <Room
                    id={this.state.room}
                    name={this.state.name}
                    toLobby={this.toLobby}
                    clientID={parseInt(this.state.clientID)}/>
                }
            </div>
        )
  };
}

export default App;
