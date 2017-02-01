'use strict';

import React from 'react';

import SCHeader from './splash-content/SC-header';
import SCContent1 from './splash-content/SC-content-1.jsx';
import SCHipster from './splash-content/SC-content-2.jsx';
import SCHired from './splash-content/SC-content-3.jsx';
import SplashFooter from './Splash-Footer';


export default () => {
	return (
		<main id="splash-content" className="valign-wrapper">
			<SCHeader/>
			<SCHipster/>
			<SCContent1/>
			<SCHired/>
			<SplashFooter/>
		</main>
	);
};