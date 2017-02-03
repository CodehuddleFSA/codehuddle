// Required libraries
import React from 'react';

// Required files
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

export default () => {
  return (
    <div>
      <nav className="row">
        <div className="col-xs-12">
          <div className="right">
            <a href="/" className="text-space-leftRight text-space-upDown">Register Organization</a>
            <a href="/" className="text-space-leftRight text-space-upDown">Interviewer Sign-in</a>
          </div>
        </div>
      </nav>

      <section className="container" id="header">
        <div className="row">
          <div className="col-xs-12 center-content">
            <img className="animated fadeIn" id="header-icon" src="/images/code-outline.svg"/>
            <h1 className="animated fadeIn">Code Huddle</h1>
            <h4 className="animated fadeIn">Technical Interviews Done Right</h4>

            <div>
              <RaisedButton
                className="animated fadeIn"
                label="Get Started"
                labelPosition="before"
                icon={ <ArrowRight /> }

                backgroundColor="#2bbbad"
                labelColor="white"
                style={{
                  animationDelay: '1s'
                }}
                />
            </div>
          </div>
        </div>
      </section>

      <section className="row marg-top" id="hipster">
      </section>

      <section className="row center-content row-padding" id="info">
        <div className="container">
          <div className="col-xs-12 col-lg-6">
            <h2>Ace Code Editor</h2>
            <p>Lorem ipsum dolor sit amet, et nibh nonummy lobortis ultricies, nisl morbi vivamus amet quo, amet ullamcorper lacus maecenas, egestas bibendum elit scelerisque mollis. Tempor est risus sociosqu luctus, turpis fusce facilisi ligula, volutpat ipsum morbi in, erat mauris suspendisse eros ante. Pede purus elit velit ut, ut interdum felis interdum tristique, odio eu ipsum cras, urna est litora in. Dolor sem ipsum amet vivamus, lectus nec fusce porta, felis quis tellus ligula. Augue odio fermentum turpis dignissim, hendrerit posuere libero convallis vel.</p>
          </div>
          <div className="col-xs-12 col-lg-6">
            <h2>Built-In Whiteboard</h2>
            <p>Lorem ipsum dolor sit amet, et nibh nonummy lobortis ultricies, nisl morbi vivamus amet quo, amet ullamcorper lacus maecenas, egestas bibendum elit scelerisque mollis. Tempor est risus sociosqu luctus, turpis fusce facilisi ligula, volutpat ipsum morbi in, erat mauris suspendisse eros ante. Pede purus elit velit ut, ut interdum felis interdum tristique, odio eu ipsum cras, urna est litora in. Dolor sem ipsum amet vivamus, lectus nec fusce porta, felis quis tellus ligula. Augue odio fermentum turpis dignissim, hendrerit posuere libero convallis vel.</p>
          </div>
        </div>
      </section>

      <section className="row marg-top" id="code">
      </section>

      <footer className="row">
        <div className="container">
          Created by
        </div>
      </footer>
    </div>
  );
};
