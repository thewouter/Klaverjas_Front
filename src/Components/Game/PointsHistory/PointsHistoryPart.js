import React from "react";
import {Text, Group} from "react-konva";

function PointsHistoryPart(props) {
    return (
        <Group>
            <Text
                x={props.x}
                y={props.y}
                width={props.width / 2 - 10}
                height={props.fontSize}
                fontSize={props.fontSize}
                text={props.score[0]}
                align="right"
                verticalAlign="top"
                fill={'black'}
            />
            <Text
                x={props.x + props.width / 2 + 10}
                y={props.y}
                width={props.width / 2 - 10}
                height={props.fontSize}
                fontSize={props.fontSize}
                text={props.score[1]}
                align="left"
                verticalAlign="top"
                fill={'black'}
            />
        </Group>
    )
}

export default PointsHistoryPart;