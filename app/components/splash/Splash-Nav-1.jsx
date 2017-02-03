import React from 'react';
import Login from '../Login';
import WhoAmI from '../WhoAmI';

export default () => {

	return (
    <header id="splash-header" className="animated fadeInDown">
      <div role="navigation">
        <ul id="header-nav-links" className="right">
          <li><Login/></li>
          <li><WhoAmI/></li>
          <li><a href="#">Register Organization</a></li>
          <li><a href="#">Interviewer Sign-In</a></li>
        </ul>
      </div>
  </header>
	);
};