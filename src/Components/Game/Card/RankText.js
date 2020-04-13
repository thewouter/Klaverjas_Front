import React from "react";
import {Text, Group} from 'react-konva'

class RankText extends React.Component{
    constructor(props) {
        super(props);
        let rankNice = '';
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
            rankNice: rankNice
        }
    }

    render() {
        return (
            <Group>
                <Text
                    x={this.props.x}
                    y={this.props.y}
                    width={this.props.width}
                    height={this.props.textSize}
                    text={this.state.rankNice}
                    align="center"
                    verticalAlign="top"
                    fontSize={this.props.fontSize}
                    fill={'black'}
                />
            </Group>
        );
    }
}

export default RankText