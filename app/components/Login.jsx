import React from 'react';
import WhoAmI from './WhoAmI';

import TextField from 'material-ui/TextField';

export const Login = ({ login }) => (
  <div>
    <form onSubmit={evt => {
      evt.preventDefault();
      login(evt.target.username.value, evt.target.password.value);
    } }>
    <div>
      <label>Username
        <TextField name="username"/>
      </label>
    </div>
    <div>
      <label>Password
        <TextField name="password" type="password"/>
      </label>
    </div>
      <input type="submit" value="Login" />
    </form>
  </div>
);

import { login } from 'APP/app/reducers/auth';
import { connect } from 'react-redux';

export default connect(state => ({}), { login })(Login);

