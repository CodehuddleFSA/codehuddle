/*global $*/

import React from 'react';
import SplashNav from './Splash-Nav';
import SplashContent from './Splash-Content';
import SplashFooter from './Splash-Footer';

export const Splash = (props) => {
	return (
		<div id="splash-root">
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
