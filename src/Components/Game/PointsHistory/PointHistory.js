import React from "react";
import {Rect, Group, Text, Line, Ellipse} from "react-konva";
import HandCard from "../Card/HandCard";
import PointHistoryPart from "./PointHistoryPart";

function PointHistory(props) {
    let dimensions = {
        x: 1920 - 210,
        y: 290,
        width: 200,
        height: 940 - 300,
        fontSize: 30
    };

    let totalScore = [0, 0, 0, 0];

    props.points.forEach((points) => {
        totalScore[0] += points[0] + points[2];
        totalScore[1] += points[1] + points[3];
    });
    let points = Array.from(props.points);

    if (props.points.length > 18) {
        let sum = [0, 0, 0, 0];
        points.slice(0, points.length - 17).forEach((points) => {
            sum[0] += points[0] + points[2];
            sum[1] += points[1] + points[3];
        });
        points.splice(0, points.length - 17);
        points.splice(0, 1, sum);
    }

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

            <Ellipse
                x={dimensions.x + 5 + (dimensions.width / 2  - 8)* (props.seat % 2) + dimensions.width / 4}
                y={dimensions.y + 8 + dimensions.fontSize / 2}
                radiusX={dimensions.width / 4}
                radiusY={dimensions.fontSize / 1.5}
                stroke={'red'}
                strokeWidth={5}
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

            {Object.keys(points).map((item, key) => {
                key = item;
                item = points[key];
                return (
                    <PointHistoryPart
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
            <PointHistoryPart
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