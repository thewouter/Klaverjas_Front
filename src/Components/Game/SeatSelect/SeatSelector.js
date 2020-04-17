import React from 'react'
import Seat from './Seat'
import {Stage} from "react-konva";

class SeatSelector extends React.Component{

    texts = {
        0: "Us 1",
        1: "Them 1",
        2: "Us 2",
        3: "Them 2"
    };

    selectSeat = (id) => {
        this.props.selector(id)
    };

    render() {
        return (
            <div>
                <Stage onMouseMove={this.mouseMove} width={1920} height={940}>
                    <Seat
                        position={0}
                        text={this.props.seats.us1.client === false ? this.texts[0] :this.props.seats.us1.client.name }
                        select={this.selectSeat}
                    />
                    <Seat
                        position={1}
                        text={this.props.seats.them1.client === false ? this.texts[1] :this.props.seats.them1.client.name }
                        select={this.selectSeat}
                    />
                    <Seat
                        position={2}
                        text={this.props.seats.us2.client === false ? this.texts[2] :this.props.seats.us2.client.name }
                        select={this.selectSeat}
                    />
                    <Seat
                        position={3}
                        text={this.props.seats.them2.client === false ? this.texts[3] :this.props.seats.them2.client.name }
                        select={this.selectSeat}
                    />
                </Stage>
            </div>
        )
    }
}

export default SeatSelector