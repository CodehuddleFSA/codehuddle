import React from 'react';

export default () => {


// $('html, body').animate({
// 	scrollTop: $("#splash-content-1").offset().top
// 	}, 2000);



	return (
		<div id="splash-header" className="container center-align">
			<div className="row">
				<ul id="splash-h1-ul">
					<li id="splash-h1-ul-svg"><img className="animated fadeIn" src="/images/code-outline.svg"/></li>
					<li id="splash-h1-ul-h1"><h1 className="animated fadeIn col s12 section">Code Huddle</h1></li>
				</ul>
			</div>
			<h4 className="animated fadeIn">Technical Interviews Done Right</h4>
			<a href="#splash-content-1" id="header-down-arrow-icon" className="animated fadeIn center-align"><i className="medium material-icons">keyboard_arrow_down</i></a>
		</div>
	);
};