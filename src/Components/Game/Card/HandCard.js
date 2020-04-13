import React from "react";
import suits from "../../../img/suits.png";
import {Group, Image, Rect, Text} from "react-konva";
import {ClientIDHandlerContext} from "../../Context/ClientIDHandler";
import SuitImage from "./SuitImage";
import RankText from "./RankText";

class HandCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 126,
            height: 200
        }
    }

    cardClick = () => {
        this.props.selectCard();
    };

    render() {
        let y = window.innerHeight - 250;
        let x = 140 * this.props.index + (this.props.screenWidth - 8 * 140) / 2;
        let mouseX =this.props.mouseX;
        let mouseY = this.props.mouseY;
        if (mouseX < x || mouseX > x + this.state.width ||
            mouseY < y || mouseY > y + this.state.height + 50) {} else {
            y -= 50;
        }

        return (
            <Group onClick={this.cardClick}>
                <Rect
                    x={x}
                    y={y}
                    width={this.state.width}
                    height={this.state.height}
                    fill="white"
                    stroke="black"
                    strokeWidth={3}
                />
                <RankText
                    rank={this.props.rank}
                    x={x}
                    y={y + 120}
                    width={this.state.width}
                    heigth={this.state.height - 120}
                    fontSize={70}
                />
                <SuitImage
                    x={x+12}
                    y={y+10}
                    suit={this.props.suit}
                    width={100}
                />
            </Group>

        )
    }
}

HandCard.contextType = ClientIDHandlerContext;

export default HandCard