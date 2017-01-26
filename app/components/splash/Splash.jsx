/*global $*/

import React from 'react';
import SplashNav from './Splash-Nav';
import SplashNav1 from './Splash-Nav-1';
import SplashContent from './Splash-Content';
import SplashFooter from './Splash-Footer';

export const Splash = (props) => {
	
	const handleScroll = () => {
		console.log(window.scrollX, window.scrollY);
	};
	
	// Initialize jQuery in root 
	$(document).ready(() => {
		// $(".button-collapse").sideNav();
	});
	return (
		<div id="splash-root" className="page-flexbox-wrapper" onScroll={ handleScroll }>
			<SplashNav1/>
			<SplashContent/>
			<SplashFooter/>
		</div>
	);
};

import {connect} from 'react-redux';

const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
