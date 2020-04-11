import React from "react";
import {Group, Rect, Text} from "react-konva";
import YesNoButton from "./YesNoButton";

class ForceTrumpSelect extends React.Component{

    dimensions = {
        width: 600,
        height: 300,
        x: window.innerWidth/2 -300,
        y: window.innerHeight/2 -150,
        margin: 5,
        buttonHeight: 90
    };

    fullSuitNames = {
        s: "Spades",
        d: "Diamonds",
        c: "Clubs",
        h: "Hearts"
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
                    return (
                        <YesNoButton
                            key={key}
                            x={this.dimensions.x + this.dimensions.margin * 2 + ((this.dimensions.width - 8 * this.dimensions.margin) / 3 + 2 * this.dimensions.margin) * ind}
                            y={this.dimensions.y + this.dimensions.height - this.dimensions.margin * 2 - this.dimensions.buttonHeight}
                            width={(this.dimensions.width - 8 * this.dimensions.margin) / 3}
                            height={this.dimensions.buttonHeight}
                            color="white"
                            text={this.fullSuitNames[item]}
                            callback={() => this.chooseTrump(item)}
                        />

                    )}
                )}
            </Group>
        )
    }
}

export default ForceTrumpSelect;