import React from "react";
import {Image} from "react-konva";
import chips from "../../img/chips.png"

class PlaySeat extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            playImage: null,
        }
    }

    positions = {
        0: {
            x: 110,
            y: 940 - 150
        },
        1: {
            x: 10,
            y: 940 / 2
        },
        2: {
            x: 1920 / 2 + 60,
            y: 10
        },
        3: {
            x: 1920 - 315,
            y: 940 / 2
        }
    };

    componentDidMount() {
        const image = new window.Image();
        image.src = chips;
        image.onload = () => {
            this.setState({playImage: image});
        }
    }

    render() {
        return (
            <Image
                x={this.positions[this.props.pos].x}
                y={this.positions[this.props.pos].y}
                image={this.state.playImage}
                scaleX={0.5}
                scaleY={0.5}
            />
        );
    }
}

export default PlaySeat