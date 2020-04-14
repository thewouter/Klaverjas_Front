import React from "react";
import {Image} from "react-konva";
import chair from "../../img/chair.png"

class ChairSeat extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            chairImage: null,
        }
    }

    positions = {
        0: {
            x: 10,
            y: window.innerHeight - 150
        },
        1: {
            x: 10,
            y: window.innerHeight / 2 - 115
        },
        2: {
            x: window.innerWidth / 2 - 155,
            y: 10
        },
        3: {
            x: window.innerWidth - 300,
            y: window.innerHeight / 2 - 115
        }
    };

    componentDidMount() {
        const image = new window.Image();
        image.src = chair;
        image.onload = () => {
            this.setState({chairImage: image});
        }
    }

    render() {
        return (
            <Image
                x={this.positions[this.props.pos].x}
                y={this.positions[this.props.pos].y}
                image={this.state.chairImage}
                scaleX={2}
                scaleY={2}
            />
        );
    }
}

export default ChairSeat