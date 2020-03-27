import React from "react";
import '../css/App.css'

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newServerName: "",
            rooms: [],
            currentRoom: -1
        }

    }

    componentDidMount() {
        fetch('https://klaverjas.local/room/list')
            .then(result => result.json())
            .then(json => this.setState({
                    rooms: Object.values(json)
                }
            ));
    }

    newServer = (event) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: this.state.newServerName })
        };
        fetch('https://klaverjas.local/room/add', requestOptions)
            .then(result => result.json())
            .then(json => this.setState(state => {
                const rooms = state.rooms.concat(json);
                return {
                    rooms,
                }
            }));
        this.setState({newServerName: ''});
        event.preventDefault();
    };

    joinServer = (id ) => {
        this.props.toRoom(id)
    };

    changeServerName = (event) => {
        this.setState({newServerName: event.target.value})
    };

    render() {
        return (
            <div>
                <form >
                    <input className="App-nameField" type="string" onChange={this.props.handler} value={this.props.name}/>
                </form>
                <div className="row">
                    <div className="column-new">
                        <form>
                            <label>
                                Name:
                                <input type="text" name="serverName" value={this.state.newServerName} onChange={this.changeServerName}/>
                            </label>
                            <button className="btn btn-lg btn-info" onClick={this.newServer}>New room</button>
                        </form>
                    </div>
                    <div className="column-join">
                        {this.state.rooms.map((item, key) => <button key={key} onClick={() => this.joinServer(item.id)} className="btn btn-info"> {item.name} ({item.id}) </button>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Start;