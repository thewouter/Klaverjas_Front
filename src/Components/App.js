import React from 'react';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import faker from 'faker'
import Room from './Room'
import Start from './Lobby/Start'
import {ClientIDHandlerContext} from './Context/ClientIDHandler'

class App extends React.Component {
    screens = {
        lobby: 0,
        room: 1
    };

    static mercureMethods = {
        ADD: 'add',
        REMOVE: 'delete',
        PATCH: 'patch'
    };

    constructor(props) {
        super(props);

        this.state = {
            name: localStorage.getItem("userName") || "",
            screen: localStorage.getItem("room") === null ? this.screens.lobby : this.screens.room,
            room: localStorage.getItem("room") || -1,
            clientIDHandler: {
                clientID: parseInt(localStorage.getItem('clientID')) || -1,
                getClientID: this.getClientID,
                handleClientIDHandler: this.handleClientIDHandler,
                mercureListeners: {
                    room:{},
                    game:{},
                    player:{},
                    trick:{}
                },
                handleMercureListener: this.handleMercureListener,
                removeMercureListener: this.removeMercureListener,
            }
        };

        let url = new URL(process.env.REACT_APP_MERCURE_URL + '/.well-known/mercure');
        url.searchParams.append('topic', 'klaverjas_dev');
        const eventSource = new EventSource(url);
        eventSource.onmessage = this.receivedMessage;
    }

    getClientID = () => {
        return this.state.clientIDHandler.clientID
    };

    receivedMessage = (event) => {
        let json = JSON.parse(event.data);
        let method = json.method;
        let object = json.object;
        if (object in this.state.clientIDHandler.mercureListeners){
            if (method in this.state.clientIDHandler.mercureListeners[object]){
                this.state.clientIDHandler.mercureListeners[object][method](json.content);
            }
        }
    };

    handleMercureListener = (object, method, fun) => {
        let clientIDHandler = this.state.clientIDHandler;
        clientIDHandler.mercureListeners[object][method] = fun;
        this.setState({clientIDHandler: clientIDHandler})
    };

    removeMercureListener = (object, method) => {
        let clientIDHandler = this.state.clientIDHandler;
        delete clientIDHandler.mercureListeners[object][method];
        this.setState({clientIDHandler: clientIDHandler})
    };

    handleClientIDHandler = (clientID) => {
        this.setState({clientID: clientID});
    };

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
        fetch(process.env.REACT_APP_API_URL + '/client/add', requestOptions)
            .then(result => result.json())
            .then(json => {
                let clientIDHandler = this.state.clientIDHandler;
                clientIDHandler.clientID = json.id;
                this.setState({clientIDHandler: clientIDHandler});
                localStorage.setItem("clientID", json.id);
            });

        this.setState({room: id});
        this.screenChange(this.screens.room);
        localStorage.setItem("room", id);
    };

    toLobby = () => {
        this.screenChange(this.screens.lobby);
        localStorage.removeItem("room");
        this.setState({room: -1});
    };

    nameChange = (event) => {
        let clientIDHandler = this.state.clientIDHandler;
        clientIDHandler.clientID = -1;
        this.setState({name: event.target.value, clientIDHandler: clientIDHandler});
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
                {/*<ClientIDHandler clientID={this.state.clientIDHandler.clientID} clientIDHandler={this.state.clientIDHandler.handleClientIDHandler}/>*/}
                <ClientIDHandlerContext.Provider value={this.state.clientIDHandler}>
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
                            clientID={this.state.clientIDHandler.clientID}/>
                    }
                </ClientIDHandlerContext.Provider>
            </div>
        )
  };
}

export default App;
