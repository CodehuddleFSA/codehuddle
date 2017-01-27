import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group, Circle} from 'react-konva';



export default class Canvas extends React.Component {
    constructor(...args) {
      super(...args);
      this.state = {
        color: 'green'
      };
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      this.setState({
        color: Konva.Util.getRandomColor()
      });
    }
    render() {
        return (
            <Stage width={700} height={700}>
        <Layer>
            <Rect
                x={10} y={10} width={500} height={500}
                fill={this.state.color}
                shadowBlur={10}
                onClick={this.handleClick}
            />
            <Circle ref="circle" radius={50} fill="black"/>
        </Layer>
      </Stage>
            
        );
    }
}


