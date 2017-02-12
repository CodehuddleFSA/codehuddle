import React from 'react';
import WhoAmI from './WhoAmI';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  margin: '10px'
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <div>
        <form onSubmit={evt => {
          evt.preventDefault();
          this.props.login(evt.target.username.value, evt.target.password.value);
        } }>
        <div>
          <TextField 
            name="username"
            floatingLabelText="UserName"
            onChange={e => this.setState({username: e.target.value})}
          />
        </div>
        <div>
          <TextField
            name="password"
            type="password"
            floatingLabelText="Password"
            onChange={e => this.setState({password: e.target.value})}
          />
        </div>
          <br/>
          <RaisedButton
            label="Sign Up"
            primary={ true }
            style={ styles }
            onClick={() => this.props.signup(null, this.state.username, this.state.password)}
            />
            <RaisedButton
            label="Login"
            primary={ true }
            type="submit"
            style={ styles }
            />
          <br/>
        </form>
      </div>
    );
  }
}

import { login, signup } from 'APP/app/reducers/auth';
import { connect } from 'react-redux';

export default connect(state => ({}), { login, signup })(Login);

