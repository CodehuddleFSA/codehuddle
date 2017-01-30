'use strict';

import React from 'react';
import SplashNav1 from './Splash-Nav-1';
import SplashContent from './Splash-Content';

export const Splash = (props) => {

	return (
		<div id="splash-root" className="page-flexbox-wrapper">
			<SplashNav1/>
			<SplashContent/>
		</div>
	);
};

import { connect } from 'react-redux';

const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
