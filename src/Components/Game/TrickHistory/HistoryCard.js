import React from "react";
import {Group} from 'react-konva';
import RankText from "../Card/RankText";
import SuitImage from "../Card/SuitImage";

function HistoryCard(props) {
    return (
        <Group>
            <SuitImage
                x={props.x}
                y={props.y}
                width={props.width / 2}
                suit={props.suit}
            />
            <RankText
                x={props.x + props.width / 2}
                y={props.y + 2}
                rank={props.rank}
                width={props.width / 2 + ((props.rank === 't') ? props.width / 8 : 0)}
                height={props.width / 2}
                fontSize={props.width / 2 + 2}
            />
        </Group>
    )
}

export default HistoryCard