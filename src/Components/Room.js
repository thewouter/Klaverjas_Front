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
            }
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

    }

    componentDidMount() {
        fetch("https://klaverjas.local/room/" + this.props.id)
            .then(result => result.json())
            .then(json => this.setState({room_api: json}))
    }

    render() {
        return (
            <div>
                <button className="btn btn-danger Room-Leave" onClick={this.lobby}>Leave</button>
                {
                    this.state.room_api.in_game &&
                        <Table
                            playerCards={[['h','a'], ['s','7'], ['d','9'], ['c','t'], ['c','a'], ['d','k'], ['h', 'q'], ['s', '8']]}/>
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