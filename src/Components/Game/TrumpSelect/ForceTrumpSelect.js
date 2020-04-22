import React from "react";
import {Group, Rect, Text} from "react-konva";
import YesNoButton from "./YesNoButton";
import SuitImage from "../Card/SuitImage";

class ForceTrumpSelect extends React.Component{

    dimensions = {
        width: 600,
        height: 300,
        x: 1920/2 -300,
        y: 940/2 -150,
        margin: 5,
        buttonHeight: 90
    };

    chooseTrump = (trump) => {
        this.props.choosCallback(trump)
    };

    render() {
        return (
            <Group>
                <Rect
                    x={this.dimensions.x}
                    y={this.dimensions.y}
                    width={this.dimensions.width}
                    height={this.dimensions.height}
                    fill="white"
                    stroke="black"
                    strokeWidth={5}/>

                <Text
                    x={this.dimensions.x + 2 * this.dimensions.margin}
                    y={this.dimensions.y + 2 * this.dimensions.margin}
                    width={this.dimensions.width - 4 * this.dimensions.margin}
                    height={this.dimensions.height - 6 * this.dimensions.margin - this.dimensions.buttonHeight}
                    text={"Choose one of these suits as trump"}
                    align="center"
                    verticalAlign="middle"
                    fontSize={35}
                />
                {Object.keys(this.props.trumpOptions).map((item, key) => {
                    let ind = key;
                    key = item;
                    item = this.props.trumpOptions[key];
                    let x = this.dimensions.x + this.dimensions.margin * 2 + ((this.dimensions.width - 8 * this.dimensions.margin) / 3 + 2 * this.dimensions.margin) * ind;
                    let y = this.dimensions.y + this.dimensions.height - this.dimensions.margin * 2 - this.dimensions.buttonHeight;
                    let width = (this.dimensions.width - 8 * this.dimensions.margin) / 3;
                    let height = this.dimensions.buttonHeight;
                    return (
                        <Group onClick={() => this.chooseTrump(item)}>
                            <Rect
                                x={x}
                                y={y}
                                width={width}
                                height={height}
                                fill={"white"}
                                strokeWidth={4}
                                stroke="black"
                            />
                            <SuitImage
                                x={x + (width - height + 20) / 2}
                                y={y + 10}
                                suit={item}
                                width={height - 20}
                            />
                        </Group>

                    )}
                )}
            </Group>
        )
    }
}

export default ForceTrumpSelect;