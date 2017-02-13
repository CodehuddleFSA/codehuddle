// Required libraries
import React from 'react';
import { GithubPicker } from 'react-color';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {blueGrey500} from 'material-ui/styles/colors';
import Close from 'material-ui/svg-icons/navigation/close';
import Stop from 'material-ui/svg-icons/av/stop';
import {PALETTE} from './WhiteboardConstants';

/* -----------------    COMPONENT     ------------------ */
//   <IconButton><Close onTouchTap={ this.handleWBClose }/></IconButton>
export class WhiteboardToolbar extends React.Component {
  // need color, strokewidth
  constructor (props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handlePickerResult = this.handlePickerResult.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap (event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handlePickerResult (color) {
    this.props.handleColorChange(color);
    this.handleRequestClose();
  }

  handleRequestClose () {
    this.setState({
      open: false
    });
  }

  render () {
    const handleClose = this.props.handleClose;
    const color = this.props.color;
    const handleClear = this.props.handleClear;
    const handleErase = this.props.handleErase;
    const tightStyle = {padding: '0px', border: '0px', margin: '0px'};
    const buttonStyle = {backgroundColor: blueGrey500};
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <IconButton style={{marginRight: '25px'}}><Close onTouchTap={handleClose}/></IconButton>
          <RaisedButton
            onTouchTap={this.handleTouchTap}
            label = 'Change Color'
            labelColor = 'white'
            buttonStyle = {buttonStyle}
            style = {tightStyle}
          />
          <IconButton>><Stop color={color}/></IconButton>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <GithubPicker
              color={color}
              colors={PALETTE}
              width={PALETTE.length * 25 + 20}
              onChangeComplete={this.handlePickerResult}/>
          </Popover>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton
            label="Eraser"
            labelColor = 'white'
            buttonStyle = {buttonStyle}
            onClick={handleErase}/>
          <RaisedButton
            label="Clear Board"
            labelColor = 'white'
            buttonStyle = {buttonStyle}
            onClick={handleClear}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
