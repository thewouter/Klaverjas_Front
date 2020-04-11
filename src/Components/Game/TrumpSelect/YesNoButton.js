import React from "react";
import {Rect, Text, Group} from "react-konva";

function YesNoButton(props) {
    return (
        <Group onClick={props.callback}>
            <Rect
                  x={props.x}
                  y={props.y}
                  width={props.width}
                  height={props.height}
                  fill={props.color}
                  strokeWidth={4}
                  stroke="black"
            />
            <Text
                x={props.x}
                y={props.y}
                width={props.width}
                height={props.height}
                text={props.text}
                align="center"
                verticalAlign="middle"
                fontSize={25}
            />
        </Group>
    )
}
export default YesNoButton;