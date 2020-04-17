import React from "react";
import {Rect, Layer, Text} from "react-konva";

class Seat extends React.Component {

    selector_size = {
        width: 150,
        height: 150
    };

    padding = 150;

    positions = {
        xm: (1920 - this.selector_size.width) / 2,
        xs: this.padding,
        xl: 1920 - this.padding - this.selector_size.width,
        ym: (940 - this.selector_size.height) / 2,
        ys: this.padding,
        yl: 940 - this.padding - this.selector_size.height
    };

    positionMap = {
        0: {
            x:this.positions.xm,
            y:this.positions.yl
        },
        1: {
            x:this.positions.xs,
            y:this.positions.ym
        },
        2: {
            x:this.positions.xm,
            y:this.positions.ys
        },
        3: {
            x:this.positions.xl,
            y:this.positions.ym
        }
    };

    selectSeat = () => {
        this.props.select(this.props.position);
    };

    render() {
        return (
            <Layer onClick={this.selectSeat}>
                <Rect
                    x={this.positionMap[this.props.position].x}
                    y={this.positionMap[this.props.position].y}
                    width={this.selector_size.width}
                    height={this.selector_size.height}
                    fill="red"
                />
                <Text
                    x={this.positionMap[this.props.position].x }
                    y={this.positionMap[this.props.position].y }
                    width={this.selector_size.width}
                    height={this.selector_size.height}
                    text={this.props.text}
                    align="center"
                    verticalAlign="middle"
                    fontSize={25}
                />
            </Layer>
        )
    }
}

export default Seat