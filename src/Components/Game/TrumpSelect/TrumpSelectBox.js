import React from "react";
import {Rect, Group, Text} from "react-konva";
import YesNoButton from "./YesNoButton";

class TrumpSelectBox extends React.Component{

    dimensions = {
        width: 400,
        height: 300,
        x: window.innerWidth/2 -200,
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

    chooseTrump = (choose) => {
        this.props.choosCallback(choose)
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
                    text={"Play on " + this.fullSuitNames[this.props.trumpOption] + "?"}
                    align="center"
                    verticalAlign="middle"
                    fontSize={35}
                />

                <YesNoButton
                    x={this.dimensions.x + this.dimensions.margin * 2}
                    y={this.dimensions.y + this.dimensions.height - this.dimensions.margin * 2 - this.dimensions.buttonHeight}
                    width={(this.dimensions.width - 6 * this.dimensions.margin) / 2}
                    height={this.dimensions.buttonHeight}
                    color="green"
                    text="Play"
                    callback={() => this.chooseTrump(true)}
                />

                <YesNoButton
                    x={this.dimensions.x + this.dimensions.width / 2 + this.dimensions.margin }
                    y={this.dimensions.y + this.dimensions.height - this.dimensions.margin * 2 - this.dimensions.buttonHeight}
                    width={(this.dimensions.width - 6 * this.dimensions.margin) / 2}
                    height={this.dimensions.buttonHeight}
                    color="red"
                    text="Pass"
                    callback={() => this.chooseTrump(false)}
                />
            </Group>
        )
    }
}

export default TrumpSelectBox;