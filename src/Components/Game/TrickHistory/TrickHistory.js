import React from "react";
import {Rect, Group, Line} from "react-konva";
import HistoryCard from "./HistoryCard";

function TrickHistory(props) {
    let dimensions = {
        x: window.innerWidth - 210,
        y: 80,
        width: 200,
        height: 200,
        textSize: 30,
    };

    return(
        <Group>
            <Rect
                x={dimensions.x}
                y={dimensions.y}
                width={dimensions.width}
                height={dimensions.height}
                fill={'white'}
                strokeWidth={5}
                stroke={'black'}
            />
            <HistoryCard
                key={props.cards[0].rank + props.cards[0].suit}
                x={dimensions.x + dimensions.width / 2 - dimensions.textSize}
                y={dimensions.y + dimensions.height - dimensions.textSize - 10}
                rank={props.cards[0].rank}
                suit={props.cards[0].suit}
                width={2 * dimensions.textSize}
            />
            <HistoryCard
                key={props.cards[1].rank + props.cards[1].suit}
                x={dimensions.x + 10}
                y={dimensions.y + (dimensions.height - dimensions.textSize) / 2}
                rank={props.cards[1].rank}
                suit={props.cards[1].suit}
                width={2 * dimensions.textSize}
            />
            <HistoryCard
                key={props.cards[2].rank + props.cards[2].suit}
                x={dimensions.x + dimensions.width / 2 - dimensions.textSize}
                y={dimensions.y + 10}
                rank={props.cards[2].rank}
                suit={props.cards[2].suit}
                width={2 * dimensions.textSize}
            />
            <HistoryCard
                key={props.cards[3].rank + props.cards[3].suit}
                x={dimensions.x + dimensions.width - 2 * dimensions.textSize - 10}
                y={dimensions.y + (dimensions.height - dimensions.textSize) / 2}
                rank={props.cards[3].rank}
                suit={props.cards[3].suit}
                width={2 * dimensions.textSize}
            />
            <Line
                x={dimensions.x}
                y={dimensions.y}
                points={[0, 0, dimensions.width, dimensions.height]}
                stroke={'black'}
            />
            <Line
                x={dimensions.x}
                y={dimensions.y}
                points={[dimensions.width, 0, 0, dimensions.height]}
                stroke={'black'}
            />
        </Group>
    )
}

export default TrickHistory