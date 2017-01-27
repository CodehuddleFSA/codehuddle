import React from 'react';
import ReactDOM from 'react-dom';



export const Whiteboard = () => {
 
    
    handleLoad() {
      console.log("inside handleLoad");
      this.state.context.strokeStyle = "purple";
      this.state.context.lineWidth = 6;
      this.state.context.lineCap = "round";
    }

    draw(start, end) {

        // Draw the line between the start and end positions
        // that is colored with the given color.
        this.state.context.beginPath();
        this.state.context.strokeStyle = 'purple';
        this.state.context.moveTo(start.x, start.y);
        this.state.context.lineTo(end.x, end.y);
        this.state.context.closePath();
        this.state.context.stroke();
    }
  

    drag(event){
      console.log(" dragging");
      if (!this.state.drawing) return;

        this.state.lastMousePosition.x = this.state.currentMousePosition.x;
        this.state.lastMousePosition.y = this.state.currentMousePosition.y;

        this.state.currentMousePosition.x = event.pageX - this.state.canvas.offsetLeft;
        this.state.currentMousePosition.y = event.pageY - this.state.canvas.offsetTop;

        this.draw(this.state.lastMousePosition, this.state.currentMousePosition);
    }

    dragStart(event){
        console.log("inside drag start");
        this.setState({
        drawing: true,
        currentMousePosition : {
          x: event.pageX - this.state.canvas.offsetLeft,
          y: event.pageY - this.state.canvas.offsetTop
        }
      });
    }

    dragStop(event){
        console.log("inside drag stop");
        this.setState({
        drawing: false
      });
     }

    render() {
        return (
            <div onLoad={this.handleLoad}>
              <canvas id="canvas" ref="canvas" width="600" height="600" onMouseUp={this.dragStop} onMouseMove={this.drag} onMouseDown={this.dragStart}></canvas>
            </div>
            
        );
    };
}

/*----------------connect container---------------------*/

// Required libraries
import {connect} from 'react-redux';

// Required filed
import { setText } from '../reducers/whiteboard';

const mapState = (state) => {
  return state;
};

const mapDispatch = (dispatch) => {
  return {
    onChange: (text) => {
      dispatch(setText(text));
    }
  };
};


/*------window container---------*/
export default connect(mapState, mapDispatch)(class extends Component {

  componentDidMount() {
    this.setState({
      canvas: this.refs.canvas,
      context: this.refs.canvas.getContext('2d')
    }, function(){
      this.handleLoad();
    });

  }


  render () {
    return <Whiteboard {...this.props} />
  }
});


