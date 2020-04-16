import React from "react";
import HandCard from "./HandCard";
import {Group} from "react-konva";

function HandCards(props) {
    let orders = {
        'h': {
            'h':0,
            'c':1,
            'd':2,
            's':3,
        },
        'c': {
            'c':0,
            'd':1,
            's':2,
            'h':3,
        },
        'd': {
            'd':0,
            's':1,
            'h':2,
            'c':3,
        },
        's': {
            's':0,
            'h':1,
            'c':2,
            'd':3,
        }
    };

    let normal_order = {
        'a':0,
        't':1,
        'k':2,
        'q':3,
        'j':4,
        '9':5,
        '8':6,
        '7':7,
    };

    let trump_order = {
        'j': 0,
        '9': 1,
        'a': 2,
        't': 3,
        'k': 4,
        'q': 5,
        '8': 6,
        '7': 7,
    };

    let order = orders[props.trump];

    let orderedCards = {};
    props.cards.forEach((card) => {
        if (card.suit === props.trump) {
            orderedCards[8 * order[card.suit] + trump_order[card.rank]] = card;
        } else {
            orderedCards[8 * order[card.suit] + normal_order[card.rank]] = card;
        }
    });

    return (
        <Group>
            {
                Object.keys(orderedCards).map((item, key) => {
                    let ind = key;
                    key = item;
                    item = orderedCards[key];
                    return (
                        <HandCard
                            key={item.id}
                            player={1}
                            index={ind}
                            id={item.id}
                            rank={item.rank}
                            suit={item.suit}
                            mouseX={props.mouseX}
                            mouseY={props.mouseY}
                            screenWidth={window.innerWidth}
                            selectCard={() => props.playCard(item.id)}
                        />
                    )}
                )}
        </Group>
    )
}

export default HandCards

