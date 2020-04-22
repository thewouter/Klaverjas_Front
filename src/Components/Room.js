import React from "react";
import '../css/Room.css';
import Table from "./Game/Table";
import SeatSelector from "./Game/SeatSelect/SeatSelector";
import {ClientIDHandlerContext} from "./Context/ClientIDHandler";
import App from "./App";

class Room extends React.Component {

    json_keys = {
        0: "us1",
        1: "them1",
        2: "us2",
        3: "them2"
    };

    constructor(props) {
        super(props);
        let room = { // defaults
            in_game: false,
            us1: {
                client: false,
                cards: {}
            },
            us2: {
                client: false,
                cards: {}
            },
            them1: {
                client: false,
                cards: {}
            },
            them2: {
                client: false,
                cards: {}
            }
        };
        this.state = {
            seat: -1,
            room_api: room,
            game_api: {
                room: room,
                points: [],
                chair: 0,
                tricks: [
                    {
                        player_1: {
                            id: false
                        },
                        player_2: {
                            id: false
                        },
                        player_3: {
                            id: false
                        },
                        player_4: {
                            id: false
                        },
                        turn: 0
                    }
                ],
            trump: null,
            trump_chosen: [null, null, null, null],
            first_player: 0,
            }
        };
    }

    lobby = () => {
        let jsonData = {};
        jsonData[this.json_keys[this.state.seat]] = false;
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        };
        fetch(process.env.REACT_APP_API_URL + '/room/' + this.props.id, requestOptions)
            .then(result => {
                return result.json();
            });

        this.props.toLobby()
    };

    selectSeat = (seat) => {
        let jsonData = {
            client: this.context.clientID
        };
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        };
        fetch(process.env.REACT_APP_API_URL + '/player/' + this.state.room_api[this.json_keys[seat]].id, requestOptions)
            .then(result => {
                    return result.json();
            })
            .then(json => {
                this.setState({seat: (json.client.id === this.context.clientID) ? seat : this.state.seat})
            })
            .catch(error => console.log(error));
    };

    startGame = () => {
        if (this.state.room_api.them1.client !== false && this.state.room_api.them2.client !== false &&
            this.state.room_api.us1.client !== false && this.state.room_api.us2.client !== false) {
            const requestOptions2 = {
                method: 'PATCH',
            };
            fetch(process.env.REACT_APP_API_URL + '/game/' + this.state.game_api.id + '/start', requestOptions2)
                .then(result => {
                    return result.json();
                })
                .then(json => {
                    this.setState({game_api: json});
                    this.reloadRoom()
                })
                .catch(error => console.log(error));

        }
    };

    reloadGame = (id) => {
        const requestOptions = {
            method: 'GET',
        };
        fetch(process.env.REACT_APP_API_URL + '/game/' + id, requestOptions)
            .then(result => {
                return result.json();
            })
            .then(json => {
                let trick = json.tricks[json.tricks.length - 1];
                json.tricks[json.tricks.length - 1] = trick;
                this.setState({game_api: json});
                let seat = -1;
                if (json.room.us1.client.id === this.props.clientID) {
                    seat = 0;
                } else if (json.room.them1.client.id === this.props.clientID) {
                    seat = 1;
                } else if (json.room.us2.client.id === this.props.clientID) {
                    seat = 2;
                } else if (json.room.them2.client.id === this.props.clientID) {
                    seat = 3;
                }
                this.setState({seat: seat})
            })
            .catch(error => console.log(error));
    };

    reloadRoom = () => {
        const requestOptions2 = {
            method: 'GET',
        };
        fetch(process.env.REACT_APP_API_URL + '/room/' + this.state.room_api.id, requestOptions2)
            .then(result => {
                return result.json();
            })
            .then(json => {
                this.setState({room_api: json});
                const requestOptions3 = {
                    method: 'GET',
                };
                fetch(process.env.REACT_APP_API_URL + '/game/' + json.games[json.games.length - 1], requestOptions3)
                    .then(result => {
                        return result.json();
                    })
                    .then(json => {
                        this.setState({game_api: json});

                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    };

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + "/room/" + this.props.id)
            .then(result => result.json())
            .then(json => {
                this.setState({room_api: json})
                const requestOptions3 = {
                    method: 'GET',
                };
                fetch(process.env.REACT_APP_API_URL + '/game/' + json.games[json.games.length - 1], requestOptions3)
                    .then(result => {
                        return result.json();
                    })
                    .then(json => {
                        this.setState({game_api: json});

                    })
                    .catch(error => console.log(error));
                if (json.in_game) {
                    this.reloadGame(json.current_game)
                }
            });

        this.context.handleMercureListener('room', App.mercureMethods.PATCH, this.roomUpdated);
        this.context.handleMercureListener('game', App.mercureMethods.PATCH, this.gameUpdated);
        this.context.handleMercureListener('player', App.mercureMethods.PATCH, this.playerUpdated);
        this.context.handleMercureListener('trick', App.mercureMethods.PATCH, this.trickChanged);
        this.context.handleMercureListener('trick', App.mercureMethods.ADD, this.trickAdded);
    }

    componentWillUnmount() {
        this.context.removeMercureListener('room', App.mercureMethods.PATCH);
        this.context.removeMercureListener('game', App.mercureMethods.PATCH);
        this.context.removeMercureListener('player', App.mercureMethods.PATCH);
        this.context.handleMercureListener('trick', App.mercureMethods.PATCH);
        this.context.handleMercureListener('trick', App.mercureMethods.ADD);
    };

    trickAdded = (json) => {
        if (json.game === this.state.game_api.id){
            if (this.state.game_api.tricks.filter((trick) => trick.id === json.id).length === 0){
                this.state.game_api.tricks.push(json);
            }
        }
    };

    trickChanged = (json) => {
        let game_api = this.state.game_api;
        let game_copy = game_api;
        game_api.tricks.forEach((item, index) => {
            if (item.id === json.id) {
                game_copy.tricks[index] = json;
            }
        });
        this.setState({game_api: game_copy})
    };

    roomUpdated = (json) => {
        if (this.state.room_api.id === json.id){
            this.setState({room_api: json});
        }
    };


    gameUpdated = (json) => {
        if (this.state.game_api.id === json.id){
            this.setState({game_api: json});
        }
    };

    playerUpdated = (json) => {
        let room_api = this.state.room_api;
        switch (json.id) {
            case room_api.us1.id:
                room_api.us1 = json;
                break;
            case room_api.us2.id:
                room_api.us2 = json;
                break;
            case room_api.them1.id:
                room_api.them1 = json;
                break;
            case room_api.them2.id:
                room_api.them2 = json;
                break;
            default:
        }
        let game_api = this.state.game_api;
        let tricks = game_api.tricks;

        if (game_api && game_api.tricks.length > 0) {
            switch (json.id) {
                case game_api.tricks[tricks.length - 1].player_1.id:
                    game_api.tricks[tricks.length - 1].player_1 = json;
                    break;
                case game_api.tricks[tricks.length - 1].player_2.id:
                    game_api.tricks[tricks.length - 1].player_2 = json;
                    break;
                case game_api.tricks[tricks.length - 1].player_3.id:
                    game_api.tricks[tricks.length - 1].player_3 = json;
                    break;
                case game_api.tricks[tricks.length - 1].player_4.id:
                    game_api.tricks[tricks.length - 1].player_4 = json;
                    break;
                default:
            }

            game_api.room = room_api;
            this.setState({game_api: game_api});
        }

        this.setState({room_api: room_api});
    };

    render() {
        return (
            <div>
                <button className="btn btn-danger Room-Leave" onClick={this.lobby}>Leave</button>
                {
                    !this.state.room_api.in_game &&
                        <button className="btn btn-success Room-Start" onClick={this.startGame}>Start</button>
                }
                {
                    this.state.room_api.in_game && this.state.seat >= 0 &&
                        <Table
                            table={this.state.game_api}
                            seat={this.state.seat}
                            updatePlayer={this.playerUpdated}/>
                }
                {
                    (!this.state.room_api.in_game || this.state.seat === -1 ) &&
                        <SeatSelector
                            seats={this.state.room_api}
                            selector={this.selectSeat}
                        />
                }
            </div>
        )
    }
}

Room.contextType = ClientIDHandlerContext;

export default Room;