'use strict';

import React from 'react';

import SCHeader from './splash-content/SC-header';
import SCContent1 from './splash-content/SC-content-1.jsx';
import SCContent2 from './splash-content/SC-content-2.jsx';

export default () => {
	return (
		<main id="splash-content" className="valign-wrapper">
			<SCHeader/>
			<SCContent1/>
			<SCContent2/>
		</main>
	);
};