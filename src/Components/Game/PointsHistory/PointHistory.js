import React from "react";
import {Rect, Group, Text, Line, Layer} from "react-konva";
import HandCard from "../Card/HandCard";
import PointsHistoryPart from "./PointsHistoryPart";

function PointHistory(props) {
    let dimensions = {
        x: window.innerWidth - 210,
        y: 290,
        width: 200,
        height: 600,
        fontSize: 30
    };

    let totalScore = [0, 0]

    props.points.forEach((points) => {
        totalScore[0] += points[0];
        totalScore[1] += points[1];
    });

    return (
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
            <Line
                x={dimensions.x + dimensions.width / 2}
                y={dimensions.y}
                points={[0, 10, 0, dimensions.height - 10]}
                stroke={'black'}
            />
            <Line
                x={dimensions.x + 10}
                y={dimensions.y + 50}
                points={[0, 0, dimensions.width - 20, 0]}
                stroke={'black'}
            />
            <Text
                x={dimensions.x + 10}
                y={dimensions.y + 10}
                width={dimensions.width / 2 - 10}
                height={50}
                text={'Us'}
                align="center"
                verticalAlign="top"
                fontSize={dimensions.fontSize}
                fill={'black'}
            />
            <Text
                x={dimensions.x + dimensions.width / 2}
                y={dimensions.y + 10}
                width={dimensions.width / 2 - 10}
                height={50}
                text={'Them'}
                align="center"
                verticalAlign="top"
                fontSize={dimensions.fontSize}
                fill={'black'}
            />

            {Object.keys(props.points).map((item, key) => {
                key = item;
                item = props.points[key];
                return (
                    <PointsHistoryPart
                        key={key}
                        x={dimensions.x}
                        y={dimensions.y + 50 + key * dimensions.fontSize}
                        width={dimensions.width}
                        fontSize={dimensions.fontSize}
                        score={item}
                    />
                )}
            )}
            <Line
                x={dimensions.x + 10}
                y={dimensions.y + dimensions.height - dimensions.fontSize}
                points={[0, 0, dimensions.width - 20, 0]}
                stroke={'black'}
            />
            <PointsHistoryPart
                x={dimensions.x}
                y={dimensions.y + dimensions.height - dimensions.fontSize}
                width={dimensions.width}
                fontSize={dimensions.fontSize}
                score={totalScore}
            />
        </Group>
    )
}

export default PointHistory