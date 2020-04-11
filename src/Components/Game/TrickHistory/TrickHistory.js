import React from "react";
import {Rect, Text, Group} from "react-konva";

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
            <Text
                key={0}
                x={dimensions.x}
                y={dimensions.y + dimensions.height - dimensions.textSize}
                width={dimensions.width}
                height={dimensions.textSize}
                text={props.cards[0].suit + props.cards[0].rank}
                align="center"
                verticalAlign="top"
                fontSize={dimensions.textSize}
                fill={'black'}
            />
            <Text
                key={1}
                x={dimensions.x + 10}
                y={dimensions.y + (dimensions.height - dimensions.textSize) / 2}
                width={dimensions.width - 20}
                height={dimensions.textSize}
                text={props.cards[1].suit + props.cards[1].rank}
                align="left"
                verticalAlign="top"
                fontSize={dimensions.textSize}
                fill={'black'}
            />
            <Text
                key={2}
                x={dimensions.x}
                y={dimensions.y + dimensions.textSize - 15}
                width={dimensions.width}
                height={dimensions.textSize}
                text={props.cards[2].suit + props.cards[2].rank}
                align="center"
                verticalAlign="top"
                fontSize={dimensions.textSize}
                fill={'black'}
            />
            <Text
                key={3}
                x={dimensions.x + 10}
                y={dimensions.y + (dimensions.height - dimensions.textSize) / 2}
                width={dimensions.width - 20 }
                height={dimensions.textSize}
                text={props.cards[3].suit + props.cards[3].rank}
                align="right"
                verticalAlign="top"
                fontSize={dimensions.textSize}
                fill={'black'}
            />
        </Group>
    )
}

export default TrickHistory