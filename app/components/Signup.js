import React from 'react';
import {connect} from 'react-redux';
import {signup} from '../reducers/auth';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <div>
        <div>
          <TextField
            name="name"
            floatingLabelText="Name"
            onChange={e => this.setState({name: e.target.value})}
          />
        </div>
        <div>
          <TextField
            name="username"
            floatingLabelText="Email"
            onChange={e => this.setState({username: e.target.value.toLowerCase()})}

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
        <div>
          <RaisedButton
            label="Signup"
            labelPosition="before"
            primary={true}
            onClick={() => this.props.signup(this.state.name, this.state.username, this.state.password)}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({}),
  {signup}
)(Signup);
