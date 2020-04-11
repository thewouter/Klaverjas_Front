import React from "react";
import {Rect, Group, Text, Image} from "react-konva"
import suits from "../../img/suits.png";

class TrumpDisplay extends React.Component{
    constructor(props) {
        super(props);

        let suit_x = 0;
        let suit_y = 0;

        let image_height = 550;
        let image_width = 504;
        switch (props.trump) {
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

        this.state = {
            suitImage: null,
            suitX: suit_x,
            suitY: suit_y,
        };
    }

    componentDidMount() {
        const image = new window.Image();
        image.src = suits;
        image.onload = () => {
            this.setState({suitImage: image});
        }
    }

    render() {
        return (
            <Group>
                <Rect
                    x={this.props.x}
                    y={this.props.y}
                    width={this.props.width}
                    height={this.props.height}
                    fill={"#d9d9d9"}
                    stroke={"black"}
                    strokeWidth={5}
                />
                <Text
                    x={this.props.x}
                    y={this.props.y+10}
                    width={this.props.width}
                    height={this.props.height}
                    text={"Trump:"}
                    align="center"
                    verticalAlign="top"
                    fontSize={35}
                />

                <Image
                    image={this.state.suitImage}
                    x={this.props.x + 49}
                    y={this.props.x + 49}
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

export default TrumpDisplay