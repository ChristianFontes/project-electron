import React, { Component } from 'react';
import {TextField, RaisedButton} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { register, sede, departament } from '../../api/constants';

export default class InputField extends Component {

  constructor(props) {
   super(props);
   const { email, name, lastName, userName, departament, sede, typeMember } = this.props.data;
   let mySede = 1;
   let myDepartment = 1;
   if (sede[0]) {
     mySede = sede[0].id;
   }
   if (departament[0]) {
     myDepartment = departament[0].id;
   }
   this.state = {
     name,
     lastName,
     userName,
     email,
     typeMember,
     password: '',
     errorUserName: '',
     errorEmail: '',
     errorPassword: '',
     errorName: '',
     errorLastName: '',
     arraySede: [],
     valueSede: mySede,
     arrayDepartament: [],
     valueDepartament: myDepartment
   };
  }

  componentWillMount() {
    let that = this;
    fetch(sede) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then(function(data) {
      const items = [];
      for (let i = 0; i < data.length; i++ ) {
        items.push(<MenuItem value={data[i].id} key={i} primaryText={`Sede de ${data[i].name}`} />);
      }
      that.setState({arraySede: items});
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });

    fetch(departament) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then(function(data) {
      const items = [];
      for (let i = 0; i < data.length; i++ ) {
        items.push(<MenuItem value={data[i].id} key={i} primaryText={`Departamento de ${data[i].name}`} />);
      }
      that.setState({arrayDepartament: items});
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });
  }

  handleChangeSede = (event, index, value) => {
    this.setState({valueSede: value});
  };

  handleChangeDepartament = (event, index, value) => {
    this.setState({valueDepartament: value});
  };

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

  handleUpdate = () => {
    const { id } = this.props.data;
    const { goBack } = this.props;

    const url = register + '/' + id;
    let credentials = {
      name: this.state.name,
      lastName: this.state.lastName,
      email: this.state.email,
      typeMember: this.state.typeMember,
      userName: this.state.userName,
      password: this.state.password,
      sede: this.state.valueSede,
      departament: this.state.valueDepartament
    }
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(res => res.json())
      .then(res => {
        if (res.user) {
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
          goBack();
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

  render() {
    const styleForm = {
      width: '40%',
      marginLeft: '30%',
      marginRigth: '30%',
      paddingBottom: 30,
      paddingTop: 30
    }
    return (
      <div style={styleForm}>
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
        /><br/>
        <SelectField
          value={this.state.valueSede}
          onChange={this.handleChangeSede}
          maxHeight={200}
        >
          {this.state.arraySede}
        </SelectField>
        <br/>
        <SelectField
          value={this.state.valueDepartament}
          onChange={this.handleChangeDepartament}
          maxHeight={200}
        >
          {this.state.arrayDepartament}
        </SelectField>
        <div style={{width: '100%', marginLeft: '25px'}}>
          <RaisedButton label="Actualizar Empleado" primary={true} onClick={::this.handleUpdate}/>
        </div>
      </div>
    );
  }
}
