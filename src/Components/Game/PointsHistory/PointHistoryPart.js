import React from "react";
import {Text, Group} from "react-konva";

function PointHistoryPart(props) {

    let usMeld = '';

    switch (props.score[2]) {
        case 20:
            usMeld = 'I';
            break;
        case 40:
            usMeld = 'II';
            break;
        case 60:
            usMeld = 'III';
            break;
        case 50:
            usMeld = 'V';
            break;
        case 70:
            usMeld = 'VI';
            break;
        case 100:
            usMeld = 'X';
            break;

    }
    let themMeld = '';

    switch (props.score[3]) {
        case 20:
            themMeld = 'I';
            break;
        case 40:
            themMeld = 'II';
            break;
        case 60:
            themMeld = 'III';
            break;
        case 50:
            themMeld = 'V';
            break;
        case 70:
            themMeld = 'VI';
            break;
        case 100:
            themMeld = 'X';
            break;

    }

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
            {
                props.score[2] !== 0 &&
                <Text
                    x={props.x + 10}
                    y={props.y}
                    width={props.width / 2 - 10}
                    height={props.fontSize}
                    fontSize={props.fontSize - 10}
                    text={usMeld}
                    align="left"
                    verticalAlign="middle"
                    fill={'black'}
                />
            }
            {
                props.score[3] !== 0 &&
                <Text
                    x={props.x + props.width / 2 - 10}
                    y={props.y}
                    width={props.width / 2 - 10}
                    height={props.fontSize}
                    fontSize={props.fontSize - 10}
                    text={themMeld}
                    align="right"
                    verticalAlign="middle"
                    fill={'black'}
                />
            }
        </Group>
    )
}

export default PointHistoryPart;