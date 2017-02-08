import React from 'react';
import Dialog from 'material-ui/Dialog/Dialog';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';

export default class SCHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
		
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleOpen() { 
		this.setState({ open: true });
	}
  handleClose() {
    this.setState({ open: false });
  }


	render() {
		const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose}
      />
    ];
		return (
			<div id="splash-header" className="container center-align">
				<div className="row">
					<ul id="splash-h1-ul">
						<li id="splash-h1-ul-svg"><img className="animated fadeIn" src="/images/code-outline.svg"/></li>
						<li id="splash-h1-ul-h1"><h1 className="animated fadeIn col s12 section">Code Huddle</h1></li>
					</ul>
				</div>
				<h4 className="animated fadeIn">Technical Interviews Done Right</h4>
				<div className="row">
					<ul id="get-started-btn">
						<li><RaisedButton  id="get-started-btn" label="Get Started" onTouchTap={ this.handleOpen } /></li>
					</ul>
					<Dialog
						title="Dialog With Actions"
						actions={ actions }
						modal={ true }
						open={ this.state.open } >
          Only actions can close this dialog.
        </Dialog>
				</div>
				<a href="#splash-content-1" id="header-down-arrow-icon" className="animated fadeIn center-align"><i className="medium material-icons">keyboard_arrow_down</i></a>
			</div>
		);
	}
}