import React from "react";
import {Rect, Group, Text} from "react-konva"
import SuitImage from "./Card/SuitImage";

function TrumpDisplay(props) {
    return (
        <Group>
            <Rect
                x={props.x}
                y={props.y}
                width={props.width}
                height={props.height}
                fill={"#d9d9d9"}
                stroke={"black"}
                strokeWidth={5}
            />
            <Text
                x={props.x}
                y={props.y+10}
                width={props.width}
                height={props.height}
                text={"Trump:"}
                align="center"
                verticalAlign="top"
                fontSize={35}
            />
            <SuitImage
                key={props.trump}
                x={props.x + 49}
                y={props.y + 49}
                suit={props.trump}
                width={100}
            />
        </Group>
    )
}

export default TrumpDisplay