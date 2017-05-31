import React, { Component, PropTypes } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { login } from '../api/constants';

export default class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  constructor(props) {
   super(props);
   this.state = {
     email: '',
     password: '',
     errorEmail: '',
     errorPassword: ''
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
    let credentials = {
      email: this.state.email,
      password: this.state.password
    }
    fetch(login, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(res => res.json())
      .then(res => {
        if (res.user) {
          const { email, username, avatar } = res.user;
          onLogin({ email, username, avatar, loggedIn: true });
          this.setState({
            errorEmail: '',
            errorPassword: ''
          });
          this.props.router.push('/loggedin');
        }else{
          if (res.error == 'Email y Contraseña son requeridas') {
            this.setState({
              errorEmail: 'El email es requerido',
              errorPassword: 'La contraseña es requerida'
            })
          }else if (res.error == 'Email y Contraseña no coinciden') {
            this.setState({
              errorPassword: 'Revise su contraseña',
              errorEmail: 'El email no coincide con su contraseña'
            })
          }else {
            this.setState({
              errorPassword: '',
              errorEmail: 'El email no se encuentra registrado'
            })
          }
        }
      }
    );
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <TextField
          hintText="Email"
          value={this.state.email} onChange={this.handleChangeEmail}
          errorText={this.state.errorEmail}
        /><br/>
        <TextField
          type="password"
          hintText="Password"
          value={this.state.password} onChange={this.handleChangePassword}
          errorText={this.state.errorPassword}
        /><br/>
        <RaisedButton label="Iniciar Sesion" primary={true} onClick={::this.handleLogin} />
      </div>
    );
  }
}
