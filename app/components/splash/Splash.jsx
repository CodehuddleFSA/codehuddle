/*global $*/

import React from 'react';
import SplashNav from './Splash-Nav';
import SplashFooter from './Splash-Footer';

export const Splash = () => {
	return (
		<div>
			<SplashNav/>
				
			<SplashFooter/>
		</div>
	);
};

import {connect} from 'react-redux';

const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
