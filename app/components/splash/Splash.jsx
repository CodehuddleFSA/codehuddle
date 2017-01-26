/*global $*/

import React from 'react';
import SplashNav from './Splash-Nav';
import SplashContent from './Splash-Content';
import SplashFooter from './Splash-Footer';

export const Splash = (props) => {
	// Initialize jQuery in root 
	$(document).ready(() => {
		$(".button-collapse").sideNav();
	});
	return (
		<div id="splash-root" className="page-flexbox-wrapper">
			<SplashNav/>
				<SplashContent/>
			<SplashFooter/>
		</div>
	);
};

import {connect} from 'react-redux';

const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
