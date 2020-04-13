import React from "react";
import suits from "../../../img/suits.png";
import {Group, Image, Rect, Text} from "react-konva";
import {ClientIDHandlerContext} from "../../Context/ClientIDHandler";
import SuitImage from "./SuitImage";
import RankText from "./RankText";

class PlayedCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 126,
            height: 200
        }
    }

    render() {
        return (
            <Group onClick={this.cardClick}>
                <Rect
                    x={this.props.x}
                    y={this.props.y}
                    width={this.state.width}
                    height={this.state.height}
                    fill="white"
                    stroke="black"
                    strokeWidth={3}
                />
                <RankText
                    rank={this.props.rank}
                    x={this.props.x}
                    y={this.props.y + 120}
                    width={this.state.width}
                    heigth={this.state.height - 120}
                    fontSize={70}
                />
                <SuitImage
                    x={this.props.x+12}
                    y={this.props.y+10}
                    suit={this.props.suit}
                    width={100}
                />
            </Group>

        )
    }
}

PlayedCard.contextType = ClientIDHandlerContext;

export default PlayedCard