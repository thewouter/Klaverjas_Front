import React from "react";

function JoinRoom(props) {
    return (
        <div>
            <button onClick={() => props.joinServer(props.id)} className="Start-join-room btn btn-info"> {props.name} ({props.id}) </button>
            <button onClick={() => props.removeServer(props.id)} className="Start-delete-room btn btn-danger"> X </button>
        </div>
    )
}

export default JoinRoom;