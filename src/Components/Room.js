import React from "react";
import '../css/Room.css';
import Table from "./Game/Table";
import SeatSelector from "./Game/SeatSelector";


class Room extends React.Component {

    json_keys = {
        0: "us1",
        1: "them1",
        2: "us2",
        3: "them2"
    };

    constructor(props) {
        super(props);
        this.state = {
            seat: -1,
            room_api: { // defaults
                in_game: false,
                us1: false,
                us2: false,
                them1: false,
                them2: false
            },
            game_api: {}
        }


    }

    lobby = () => {
        let jsonData = {};
        jsonData[this.json_keys[this.state.seat]] = false;
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        };
        fetch('https://klaverjas.local/room/' + this.props.id, requestOptions)
            .then(result => {
                return result.json();
            })
            .then(json => this.setState({room_api: json}))
            .catch(error => console.log(error));

        this.props.toLobby()
    };

    selectSeat = (seat) => {
        let jsonData = {};
        jsonData[this.json_keys[seat]] = this.props.clientID;
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        };
        fetch('https://klaverjas.local/room/' + this.props.id, requestOptions)
            .then(result => {
                    return result.json();
            })
            .then(json => {
                this.setState({room_api: json, seat: (json[this.json_keys[seat]].id === this.props.clientID) ? seat : this.state.seat})
            })
            .catch(error => console.log(error));
    };

    startGame = () => {
        if (this.state.room_api.them1 !== false && this.state.room_api.them2 !== false && this.state.room_api.us1 !== false && this.state.room_api.us2 !== false) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({room: this.state.room_api.id})
            };
            fetch('https://klaverjas.local/game/add', requestOptions)
                .then(result => {
                    return result.json();
                })
                .then(json => {
                    const requestOptions2 = {
                        method: 'PATCH',
                    };
                    fetch('https://klaverjas.local/game/' + json.id + '/start', requestOptions2)
                        .then(result => {
                            return result.json();
                        })
                        .then(json => {
                            this.setState({game_api: json});
                            this.reloadRoom()
                        })
                        .catch(error => console.log(error));
                })
                .catch(error => console.log(error));

        }
    };

    reloadGame = (id) => {
        const requestOptions = {
            method: 'GET',
        };
        fetch('https://klaverjas.local/game/' + id, requestOptions)
            .then(result => {
                return result.json();
            })
            .then(json => {
                this.setState({game_api: json});
                let seat = -1;
                if (json.room.us1.id === this.props.clientID) {
                    seat = 0;
                } else if (json.room.them1.id === this.props.clientID) {
                    seat = 1;
                } else if (json.room.us2.id === this.props.clientID) {
                    seat = 2;
                } else if (json.room.them2.id === this.props.clientID) {
                    seat = 3;
                }
                console.log(this.props.table)
                this.setState({seat: seat})
            })
            .catch(error => console.log(error));
    };

    reloadRoom = () => {
        const requestOptions2 = {
            method: 'GET',
        };
        fetch('https://klaverjas.local/room/' + this.state.room_api.id, requestOptions2)
            .then(result => {
                return result.json();
            })
            .then(json => {
                this.setState({room_api: json});

            })
            .catch(error => console.log(error));
    };

    componentDidMount() {
        fetch("https://klaverjas.local/room/" + this.props.id)
            .then(result => result.json())
            .then(json => {
                this.setState({room_api: json})
                if (json.in_game) {
                    this.reloadGame(json.current_game)
                }
            })
    }

    render() {
        return (
            <div>
                <button className="btn btn-danger Room-Leave" onClick={this.lobby}>Leave</button>
                {
                    !this.state.room_api.in_game &&
                        <button className="btn btn-success Room-Start" onClick={this.startGame}>Start</button>
                }
                {
                    this.state.room_api.in_game && this.state.seat !== -1 &&
                        <Table
                            table={this.state.game_api}
                            seat={this.state.seat}/>
                }
                {
                    !this.state.room_api.in_game &&
                        <SeatSelector
                            seats={this.state.room_api}
                            selector={this.selectSeat}
                        />
                }
            </div>
        )
    }
}



export default Room;