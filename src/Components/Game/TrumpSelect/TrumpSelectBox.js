import React from "react";
import {Rect, Group, Text} from "react-konva";
import YesNoButton from "./YesNoButton";
import SuitImage from "../Card/SuitImage";

class TrumpSelectBox extends React.Component{

    dimensions = {
        width: 400,
        height: 300,
        x: 1920/2 -200,
        y: 940/2 -150,
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
                    y={this.dimensions.y + 4 * this.dimensions.margin}
                    width={this.dimensions.width - 4 * this.dimensions.margin}
                    height={this.dimensions.height - 6 * this.dimensions.margin - this.dimensions.buttonHeight}
                    text={"Play on " + this.fullSuitNames[this.props.trumpOption] + "?"}
                    align="center"
                    fontSize={35}
                />

                <SuitImage
                    x={this.dimensions.x + (this.dimensions.width - this.dimensions.buttonHeight) / 2}
                    y={this.dimensions.y  + 70}
                    suit={this.props.trumpOption}
                    width={this.dimensions.buttonHeight}
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