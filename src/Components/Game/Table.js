import React from "react";
import wood from "../../img/wood.jpg";
import {Ellipse, Arrow, Layer, Stage} from "react-konva";
import HandCard from "./Card/HandCard";
import {ClientIDHandlerContext} from "../Context/ClientIDHandler";
import App from "../App";
import PlayedCard from "./Card/PlayedCard";
import TrumpSelectBox from "./TrumpSelect/TrumpSelectBox";
import ForceTrumpSelect from "./TrumpSelect/ForceTrumpSelect";
import TrumpDisplay from "./TrumpDisplay";
import TrickHistory from "./TrickHistory/TrickHistory";
import PointHistory from "./PointsHistory/PointHistory";
import ChairSeat from "./ChairSeat";
import PlaySeat from "./PlaySeat";

class Table extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fillPatternImage: null,
            mouseX: 0,
            mouseY: 0,
            turn: 0
        };
        this.relativePlayPosition()
    }

    positionNames = {
        0: "us1",
        1: "them1",
        2: "us2",
        3: "them2"
    };

    playerPositions = {
        0: {
            x: 0,
            y: window.innerHeight * 3 / 10
        },
        1: {
            x: - window.innerWidth * 3 / 10,
            y: 0
        },
        2: {
            x: 0,
            y: - window.innerHeight * 3 / 10
        },
        3: {
            x: window.innerWidth * 3 / 10,
            y: 0
        },
    };

    relativeCardPositions = {
        0: {
            x: 0,
            y: 0
        },
        1: {
            x: - window.innerWidth * 3 / 10,
            y: 0
        },
        2: {
            x: 0,
            y: - window.innerHeight * 4 / 10
        },
        3: {
            x: window.innerWidth * 3 / 10,
            y: 0
        },
    };

    suits = ['s', 'd', 'c', 'h'];

    componentDidMount() {
        const image = new window.Image();
        image.src = wood;
        image.onload = () => {
            this.setState({fillPatternImage: image});
        }
    }

    mouseMove = (event) => {
        let mouseX = event.evt.clientX;
        let mouseY = event.evt.clientY;
        this.setState({mouseX: mouseX, mouseY: mouseY})
    };

    relativePlayPosition = () =>{
        return this.playerPositions[this.playPosition()];
    };

    playPosition = () =>{
        return (this.props.table.tricks[this.props.table.tricks.length - 1].turn - this.props.seat + this.props.table.first_player + 4) % 4;
    };

    playCard = (id) => {
        if (!this.props.table.trump_chosen.some((chosen) => chosen === true)) {
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({client: this.context.clientID, card: id})
        };
        fetch('https://klaverjas.local/trick/' + this.props.table.tricks[this.props.table.tricks.length - 1].id + '/play', requestOptions)
            .then(result => {
                fetch('https://klaverjas.local/player/' + this.props.table.room[this.positionNames[this.props.seat]].id )
                    .then(result => result.json())
                    .then(json =>{
                        this.props.updatePlayer(json);
                    });
            });
    };

    selectTrump = (trump, choose) => {
        let trumpChosen = this.props.table.trump_chosen;
        trumpChosen[(this.props.seat - this.props.table.first_player + 4) % 4] = choose;
        console.log(this.props.table.room.id)
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({trump_chosen: trumpChosen, trump: trump})
        };
        fetch('https://klaverjas.local/game/' + this.props.table.id, requestOptions)
            .then(result => {
                return result.json();
            });
    };

    render() {
        const cards = Object.values(this.props.table.room[this.positionNames[this.props.seat]].cards);
        const currentTrick = this.props.table.tricks[this.props.table.tricks.length - 1];
        const playedCards = [
            currentTrick.card_1,
            currentTrick.card_2,
            currentTrick.card_3,
            currentTrick.card_4,
                ];
        return (
            <div >
                <Stage onMouseMove={this.mouseMove} width={window.innerWidth} height={window.innerHeight}>
                    <Layer >
                        <Ellipse
                            x={window.innerWidth / 2}
                            y={window.innerHeight / 2}
                            width={0.5*window.innerWidth}
                            height={0.25*window.innerWidth}
                            fillPatternImage={this.state.fillPatternImage}
                            fillPatternOffsetX={-2000}
                            fillPatternScaleX={0.25}
                            fillPatternScaleY={0.2}
                            stroke="black"
                            radiusX={500}
                            radiusY={200}/>
                        {Object.keys(playedCards).map((item, key) => {
                            let ind = key;
                            key = item;
                            item = playedCards[key];
                            if (item === false || item == null) {
                                return (
                                    <Arrow key={key} points={[0, 0, 0, 0]} />
                                );
                            }
                            return (
                                <PlayedCard
                                    key={item.id}
                                    index={key}
                                    id={item.id}
                                    x={window.innerWidth / 2 + this.relativeCardPositions[(ind - this.props.seat + this.props.table.first_player + 4)% 4].x - 126/2}
                                    y={window.innerHeight / 2 + this.relativeCardPositions[(ind - this.props.seat + this.props.table.first_player + 4)% 4].y - 100}
                                    rank={item.rank}
                                    suit={item.suit}
                                />
                            )}
                        )}
                        {Object.keys(cards).map((item, key) => {
                            key = item;
                            item = cards[key];
                            return (
                                <HandCard
                                    key={item.id}
                                    player={1}
                                    index={key}
                                    id={item.id}
                                    rank={item.rank}
                                    suit={item.suit}
                                    mouseX={this.state.mouseX}
                                    mouseY={this.state.mouseY}
                                    screenWidth={window.innerWidth}
                                    selectCard={() => this.playCard(item.id)}
                                />
                            )}
                        )}
                        {
                            this.props.table.trump_chosen[(this.props.seat - this.props.table.first_player + 4) % 4] === null &&
                            this.props.seat === (currentTrick.turn + this.props.table.first_player + 4) % 4 &&
                            !this.props.table.trump_chosen.some((val) => val === true) &&
                            <TrumpSelectBox
                                trumpOption={this.props.table.trump}
                                choosCallback={(choose) => this.selectTrump(this.props.table.trump, choose)}
                            />
                        }
                        {
                            this.props.seat === (currentTrick.turn + this.props.table.first_player + 4) % 4 &&
                            this.props.table.trump_chosen.every((val) => val === false) &&
                            <ForceTrumpSelect
                                trumpOptions={this.suits.filter((suit) => suit !== this.props.table.trump)}
                                choosCallback={(trump) => this.selectTrump(trump, true)}
                            />
                        }
                        <Arrow
                            x={window.innerWidth/2}
                            y={window.innerHeight/2}
                            points={[0, 0, this.relativePlayPosition().x, this.relativePlayPosition().y]}
                            pointerLength={50}
                            pointerWidth={50}
                            fill='red'
                            strokeWidth={4}
                            stroke='red'
                        />
                        {
                            this.props.table.trump_chosen.some((chosen) => chosen === true) &&
                            <TrumpDisplay
                                x={20}
                                y={20}
                                width={200}
                                height={200}
                                trump={this.props.table.trump}
                            />
                        }
                        {
                            this.props.table.tricks.length > 1 &&
                            <TrickHistory
                                key={this.props.table.tricks[this.props.table.tricks.length - 2].id}
                                cards={[
                                    this.props.table.tricks[this.props.table.tricks.length - 2]['card_' + ((-this.props.table.prev_first_player + this.props.seat + 4) % 4 + 1).toString()],
                                    this.props.table.tricks[this.props.table.tricks.length - 2]['card_' + ((-this.props.table.prev_first_player + this.props.seat + 5) % 4 + 1).toString()],
                                    this.props.table.tricks[this.props.table.tricks.length - 2]['card_' + ((-this.props.table.prev_first_player + this.props.seat + 6) % 4 + 1).toString()],
                                    this.props.table.tricks[this.props.table.tricks.length - 2]['card_' + ((-this.props.table.prev_first_player + this.props.seat + 7) % 4 + 1).toString()]]}/>
                        }
                        <PointHistory
                            points={this.props.table.points}
                        />
                        <ChairSeat
                            pos={(this.props.table.first_player - this.props.seat + 4) % 4}
                        />
                        {
                            this.props.table.trump_chosen.some((val) => val === true) &&
                            <PlaySeat
                                pos={(this.props.table.first_player + this.props.table.trump_chosen.indexOf(true) - this.props.seat + 4) % 4}
                            />
                        }
                    </Layer>
                </Stage>
            </div>
        );
    }
}

Table.contextType = ClientIDHandlerContext;

export default Table;