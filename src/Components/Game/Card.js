import React from "react";
import suits from "../../img/suits.png";
import {Group, Image, Rect, Text} from "react-konva";

class Card extends React.Component {
    constructor(props) {
        super(props);

        let suit_x = 0;
        let suit_y = 0;

        let image_height = 550;
        let image_width = 504;
        switch (props.suit) {
            case 's':
                break;
            case 'h':
                suit_x = image_width - 230;
                break;
            case 'd':
                suit_y = image_height - 255;
                break;
            case 'c':
                suit_x = image_width - 230;
                suit_y = image_height - 255;
                break;
            default:
                break;
        }
        let rankNice = ''
        switch (props.rank) {
            case '7':
                rankNice = '7';
                break;
            case '8':
                rankNice = '8';
                break;
            case '9':
                rankNice = '9';
                break;
            case 't':
                rankNice = '10';
                break;
            case 'j':
                rankNice = 'J';
                break;
            case 'q':
                rankNice = 'Q';
                break;
            case 'k':
                rankNice = 'K';
                break;
            case 'a':
                rankNice = 'A';
                break;
            default:
                break;
        }

        this.state = {
            x: 140 * props.index + (window.innerWidth - 8 * 140) / 2,
            y: window.innerHeight - 250,
            suitImage: null,
            suitX: suit_x,
            suitY: suit_y,
            width: 126,
            height: 200,
            rankNice: rankNice
        }
    }

    componentDidMount() {
        const image = new window.Image();
        image.src = suits;
        image.onload = () => {
            this.setState({suitImage: image});
        }
    }

    cardClick = () => {
        alert(this.props.suit + this.props.rank)
    };

    render() {
        let y = this.state.y;
        let mouseX =this.props.mouseX;
        let mouseY = this.props.mouseY;
        if (mouseX < this.state.x || mouseX > this.state.x + this.state.width ||
            mouseY < this.state.y || mouseY > this.state.y + this.state.height + 50) {} else {
            y -= 50;
        }

        return (
            <Group onClick={this.cardClick}>
                <Rect
                    x={this.state.x}
                    y={y}
                    width={this.state.width}
                    height={this.state.height}
                    fill="white"
                    stroke="black"
                    strokeWidth={3}
                />
                <Text
                    text={this.state.rankNice}
                    x={this.state.x + 40 - 15*(this.props.rank === 't')}
                    y={y + 120}
                    fontSize={70}
                />
                <Image
                    image={this.state.suitImage}
                    x={this.state.x + 12}
                    y={y + 10}
                    scaleX={0.2}
                    scaleY={0.2}
                    cropX={this.state.suitX}
                    cropY={this.state.suitY}
                    cropWidth={230}
                    cropHeight={255}
                />
            </Group>

        )
    }
}

export default Card