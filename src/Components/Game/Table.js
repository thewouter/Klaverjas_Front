import React from "react";
import wood from "../../img/wood.jpg";
import {Ellipse, Layer, Stage} from "react-konva";
import Card from "./Card";

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fillPatternImage: null,
            mouseX: 0,
            mouseY: 0
        }
        console.log(this.props.table.room)
        console.log(this.positionNames[this.props.seat])
    }

    positionNames = {
        0: "us1",
        1: "them1",
        2: "us2",
        3: "them2"
    }

    componentDidMount() {
        const image = new window.Image();
        image.src = wood;
        image.onload = () => {
            this.setState({fillPatternImage: image});
        }
    }

    mouseMove = (event) => {
        let mouseX = event.evt.clientX;
        let mouseY = event.evt.clientY;
        this.setState({mouseX: mouseX, mouseY: mouseY})
    };

    render() {
        return (
            <div >
                <Stage onMouseMove={this.mouseMove} width={window.innerWidth} height={window.innerHeight}>
                    <Layer >
                        <Ellipse
                            x={window.innerWidth / 2}
                            y={window.innerHeight / 2}
                            width={0.5*window.innerWidth}
                            height={0.25*window.innerWidth}
                            fillPatternImage={this.state.fillPatternImage}
                            fillPatternOffsetX={-2000}
                            fillPatternScaleX={0.25}
                            fillPatternScaleY={0.2}
                            stroke="black"
                        />
                        {this.props.table.room[this.positionNames[this.props.seat]].cards.map((item, key) => {
                                return (
                                    <Card
                                        key={key}
                                        player={1}
                                        index={key}
                                        suit={item.suit}
                                        rank={item.rank}
                                        mouseX={this.state.mouseX}
                                        mouseY={this.state.mouseY}
                                        screenWidth={window.innerWidth}
                                    />
                                )
                            }
                        )}
                    </Layer>
                </Stage>
            </div>
        );
    }
}

export default Table;