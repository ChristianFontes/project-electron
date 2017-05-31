import React, { Component, PropTypes } from 'react';
import { TextField } from 'material-ui';

export default class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  constructor(props) {
   super(props);
   this.state = {
     email: '',
     password: ''
   };
  }

  handleChangeEmail = (event) => {
   this.setState({
     email: event.target.value
   });
  }

  handleChangePassword = (event) => {
   this.setState({
     password: event.target.value
   });
  }

  handleLogin = () => {
    const { onLogin } = this.props;
    console.log(this.state);
    //onLogin({ email, password, loggedIn: true });

    //this.props.router.push('/loggedin');
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <TextField
          hintText="Email"
          value={this.state.email} onChange={this.handleChangeEmail}
        /><br/>
        <TextField
          hintText="Password"
          value={this.state.password} onChange={this.handleChangePassword}
        /><br/>
        <input ref="username" type="text" />
        <button onClick={::this.handleLogin}>Log In</button>
      </div>
    );
  }
}
