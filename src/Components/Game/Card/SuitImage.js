import React from "react";
import {Image, Group} from 'react-konva'
import suits from "../../../img/suits.png";

class SuitImage extends React.Component {

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
                suit_x = image_width;
                suit_y = image_height;
                break;
        }



        this.state = {
            suitImage: null,
            suitX: suit_x,
            suitY: suit_y,
            scale: props.width / image_width
        }
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
                <Image
                    image={this.state.suitImage}
                    x={this.props.x}
                    y={this.props.y}
                    scaleX={this.state.scale}
                    scaleY={this.state.scale}
                    cropX={this.state.suitX}
                    cropY={this.state.suitY}
                    cropWidth={230}
                    cropHeight={255}
                />
            </Group>
        )
    }
}

export default SuitImage