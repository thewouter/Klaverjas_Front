import React from "react";
import '../../css/App.css'
import App from '../App';
import JoinRoom from "./JoinRoom";
import {ClientIDHandlerContext} from '../Context/ClientIDHandler'

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newServerName: "",
            rooms: [],
            currentRoom: -1
        };


    }

    removedRoom = (json) => {
        this.setState({rooms: this.state.rooms.filter(room => room.id !== json.id)})
    };

    receivedNewRoom = (json) => {
        this.setState(state => {
            const rooms = state.rooms.concat(json);
            return {
                rooms,
            }
        })
    };

    componentDidMount() {
        fetch('https://klaverjasapi.woutervanharten.nl/room/list')
            .then(result => result.json())
            .then(json => this.setState({
                    rooms: Object.values(json)
                }
            ));
        this.context.handleMercureListener('room', App.mercureMethods.ADD, this.receivedNewRoom);
        this.context.handleMercureListener('room', App.mercureMethods.REMOVE, this.removedRoom);
    }

    newServer = (event) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: this.state.newServerName})
        };
        fetch('https://klaverjasapi.woutervanharten.nl/room/add', requestOptions)
            .then(result => result.json());
        this.setState({newServerName: ''});
        event.preventDefault();
    };

    joinServer = (id) => {
        this.props.toRoom(id)
    };

    removeServer = (id) => {
        const requestOptions = {
            method: 'DELETE'
        };
        fetch('https://klaverjasapi.woutervanharten.nl/room/' + id, requestOptions)
            .then(result => {
                return result.json();
            })
    };

    changeServerName = (event) => {
        this.setState({newServerName: event.target.value})
    };

    render() {
        return (
            <div>
                <form>
                    <input className="App-nameField" type="string" onChange={this.props.handler}
                           value={this.props.name}/>
                </form>
                <div className="row">
                    <div className="column-new">
                        <form>
                            <label>
                                Name:
                                <input type="text" name="serverName" value={this.state.newServerName}
                                       onChange={this.changeServerName}/>
                            </label>
                            <button className="btn btn-lg btn-info" onClick={this.newServer}>New room</button>
                        </form>
                    </div>
                    <div className="column-join">
                        {this.state.rooms.map((item, key) =>
                            <JoinRoom
                                key={key}
                                name={item.name}
                                id={item.id}
                                joinServer={this.joinServer}
                                removeServer={this.removeServer}/>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

Start.contextType = ClientIDHandlerContext;

export default Start;