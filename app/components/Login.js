import React, { Component, PropTypes } from 'react';
import { TextField, RaisedButton, Card, CardHeader, CardTitle, CardText } from 'material-ui';
import { login, register } from '../api/constants';

export default class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  constructor(props) {
   super(props);
   this.state = {
     name: '',
     lastName: '',
     userName: '',
     email: '',
     password: '',
     errorUserName: '',
     errorEmail: '',
     errorPassword: '',
     errorName: '',
     errorLastName: '',
     showLogin: true
   };
  }

  handleChangeName = (event) => {
   this.setState({
     name: event.target.value
   });
  }

  handleChangeLastName = (event) => {
   this.setState({
     lastName: event.target.value
   });
  }

  handleChangeUserName = (event) => {
   this.setState({
     userName: event.target.value
   });
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
      userName: this.state.userName,
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
        console.log('id de resp', res.user.id);
        if (res.user) {
          let token = res.token;
          const { email, name, lastName, userName, typeMember, avatar, id } = res.user;
          onLogin({ email, name, lastName, userName, typeMember, avatar, token, id, loggedIn: true });
          this.setState({
            errorUserName: '',
            errorPassword: ''
          });
          this.props.router.push('/loggedin');
        }else{
          if (res.error == 'Nombre de Usuario y Contraseña son requeridas') {
            this.setState({
              errorUserName: 'El nombre de usuario es requerido',
              errorPassword: 'La contraseña es requerida'
            })
          }else if (res.error == 'Nombre de usuario y Contraseña no coinciden') {
            this.setState({
              errorPassword: 'Revise su contraseña',
              errorUserName: 'El nombre de usuario no coincide con su contraseña'
            })
          }else {
            this.setState({
              errorPassword: '',
              errorUserName: 'El nombre de usuario no se encuentra registrado'
            })
          }
        }
      }
    );
  }

  handleRegister = () => {
    const { onLogin } = this.props;
    let credentials = {
      name: this.state.name,
      lastName: this.state.lastName,
      email: this.state.email,
      typeMember: 'Gestor',
      userName: this.state.userName,
      password: this.state.password
    }
    fetch(register, {
      method: 'Post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.user) {
          const { email, name, lastName, avatar } = res.user;
          onLogin({ email, name, lastName, avatar, loggedIn: true });
          this.setState({
            name: '',
            lastName: '',
            email: '',
            password: '',
            userName: '',
            errorUserName: '',
            errorEmail: '',
            errorPassword: '',
            errorName: '',
            errorLastName: '',
          });
          this.props.router.push('/loggedin');
        }
        if (res.err) {
          if (res.err.invalidAttributes.name) {
            if (res.err.invalidAttributes.name[0].rule == 'required') {
              this.setState({errorName: 'El nombre es requerido'});
            }
          }
          if (!res.err.invalidAttributes.name) {
            this.setState({errorName: ''});
          }
          if (res.err.invalidAttributes.lastName) {
            if (res.err.invalidAttributes.lastName[0].rule == 'required') {
              this.setState({errorLastName: 'El apellido es requerido'});
            }
          }
          if (!res.err.invalidAttributes.lastName) {
            this.setState({errorLastName: ''});
          }
          if (res.err.invalidAttributes.userName) {
            if (res.err.invalidAttributes.userName[0].rule == 'required') {
              this.setState({errorUserName: 'El nombre de usuario es requerido'});
            }
          }
          if (!res.err.invalidAttributes.userName) {
            this.setState({errorUserName: ''});
          }
          if (res.err.invalidAttributes.email) {
            if (res.err.invalidAttributes.email[0].rule == 'email') {
              this.setState({errorEmail: 'El email no es valido'});
            }
          }
          if (!res.err.invalidAttributes.email) {
            this.setState({errorEmail: ''});
          }
          if (res.err.invalidAttributes.password) {
            if (res.err.invalidAttributes.password[0].rule == 'required') {
              this.setState({errorPassword: 'El password es requerido'});
            }
          }
          if (!res.err.invalidAttributes.password) {
            this.setState({errorPassword: ''});
          }
        }
      }
    );
  }

  handleChangeView = () => {
   this.setState({
     name: '',
     lastName: '',
     email: '',
     password: '',
     userName: '',
     errorEmail: '',
     errorPassword: '',
     errorName: '',
     errorLastName: '',
     errorUserName: '',
     showLogin: !this.state.showLogin
   });
  }


  render() {
    const { showLogin } = this.state;
    let imgUrl = '../app/images/bg.jpg';
    var background = {
        width: '100%',
        height: '100%',
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundSize: 'cover',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1
      };
    var center = {
      width: '50%',
      margin: '0 auto'
    }
    var centerButton = {
      width: '50%',
      margin: '0 auto',
      marginTop: '5%'
    }
    if (showLogin) {
      return (
        <div style={background}>
          <div style={center}>
            <Card style={{marginTop: '10%'}}>
              <CardTitle title="Iniciar Sesion" />
              <CardText style={{width: '50%', margin: '0 auto'}}>
                <TextField
                  hintText="Nombre de Usuario"
                  value={this.state.userName} onChange={this.handleChangeUserName}
                  errorText={this.state.errorUserName}
                /><br/>
                <TextField
                  type="password"
                  hintText="Contraseña"
                  value={this.state.password} onChange={this.handleChangePassword}
                  errorText={this.state.errorPassword}
                /><br/><br/>
                <div style={{width: '50%', margin: '0 auto'}}>
                  <RaisedButton label="Iniciar Sesion" primary={true} onClick={::this.handleLogin}/>
                </div>
              </CardText>
            </Card>
            <div style={centerButton}>
            <RaisedButton label="Registrar una nueva cuenta" primary={true} onClick={::this.handleChangeView}/>
            </div>
          </div>
        </div>
      );
    }else {
      return (
        <div style={background}>
          <div style={center}>
            <Card style={{marginTop: '10%'}}>
              <CardTitle title="Registrar" />
              <CardText style={{width: '50%', margin: '0 auto'}}>
                <TextField
                  hintText="Nombres"
                  value={this.state.name} onChange={this.handleChangeName}
                  errorText={this.state.errorName}
                /><br/>
                <TextField
                  hintText="Apellidos"
                  value={this.state.lastName} onChange={this.handleChangeLastName}
                  errorText={this.state.errorLastName}
                /><br/>
                <TextField
                  hintText="Correo Electronico"
                  value={this.state.email} onChange={this.handleChangeEmail}
                  errorText={this.state.errorEmail}
                /><br/>
                <TextField
                  hintText="Nombre de Usuario"
                  value={this.state.userName} onChange={this.handleChangeUserName}
                  errorText={this.state.errorUserName}
                /><br/>
                <TextField
                  type="password"
                  hintText="Contaseña"
                  value={this.state.password} onChange={this.handleChangePassword}
                  errorText={this.state.errorPassword}
                /><br/><br/>
                <div style={{width: '50%', margin: '0 auto'}}>
                  <RaisedButton label="Registrarse" primary={true} onClick={::this.handleRegister}/>
                </div>
                </CardText>
              </Card>
              <div style={centerButton}>
                <RaisedButton label="Iniciar Sesion con su cuenta" primary={true} onClick={::this.handleChangeView}/>
              </div>
          </div>
        </div>
      );
    }
  }
}
