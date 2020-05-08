import React from 'react';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        const regex = RegExp('.*\\/room\\/\\d*$','g');
        let room = -1;
        if (regex.test(window.location.href) && parseInt(localStorage.getItem('clientID')) > 0) {
            room = parseInt( window.location.href.substring(window.location.href.lastIndexOf('/') + 1) );
        } else { // not in room
            const requestOptions = {
                method: 'POST',
            };
            fetch(process.env.REACT_APP_API_URL + '/client/' + parseInt(localStorage.getItem('clientID')) + '/logout', requestOptions)
                .then(result => {
                    return result.json();
                });
        }
        this.state = {
            name: localStorage.getItem("userName") || "",
            screen: room === -1 ? this.screens.lobby : this.screens.room,
            room: room,
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
        url.searchParams.append('topic', process.env.REACT_APP_MERCURE_TOPIC);
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
        this.setState({resize: 940 + 1920});
    };

    screenChange = (screen) => {
        this.setState({screen: screen})
    };


    toRoom = (id) => {
        if(this.state.name.length < 1) {
            document.getElementById('set-username').select();
            return;
        }
        let name = this.state.name;
        if (this.state.name.length > 49) {
            name = name.substring(1,49);
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name })
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
        window.history.pushState({ foo: 'fake' }, 'Room ' + id, '/room/' + id);
        localStorage.setItem("room", id);
    };

    toLobby = () => {
        this.screenChange(this.screens.lobby);
        localStorage.removeItem("room");
        window.history.pushState({ foo: 'fake' }, 'Lobby', '/');
        this.setState({room: -1});
        const requestOptions = {
            method: 'POST',
        };
        fetch(process.env.REACT_APP_API_URL + '/client/' + parseInt(this.state.clientID) + '/logout', requestOptions)
            .then(result => {
                return result.json();
            });
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
