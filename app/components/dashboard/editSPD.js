import React, { Component } from 'react';
import { TextField, RaisedButton, Card, AppBar } from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { sede, provider, departament } from '../../api/constants';

export default class InputField extends Component {

  constructor(props) {
   super(props);
   console.log(this.props.data);
   const { name, id, update } = this.props.data;
   this.state = {
     name,
     id,
     update
   };
  }

  handleChangeName = (event) => {
   this.setState({
     name: event.target.value
   });
  }

  handleUpdate = () => {
    const { id, update } = this.state;
    const { goBack } = this.props;
    let url = null;

    if (update == 'sede') {
      url = sede + '/' + id;
    }else if (update == 'departament') {
      url = departament + '/' + id;
    }else if (update == 'provider') {
      url = provider + '/' + id;
    }

    let credentials = {
      name: this.state.name
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
        console.log(res);
        if (res.id) {
          this.setState({
            name: '',
          });
          goBack();
        }
        if (res.invalidAttributes.name) {
          if (res.invalidAttributes.name[0].rule == 'required') {
            this.setState({errorName: 'El nombre es requerido'});
          }
        }
        if (!res.invalidAttributes.name) {
          this.setState({errorName: ''});
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
    const inputStyle = {
      marginLeft: '25%',
      marginTop: 10,
      marginBottom: 10,
    }
    const { update } = this.state;
    let title = null,
        buttonName = null;
    if (update == 'sede') {
      title = 'Editar Sede';
      buttonName = 'Actualizar Sede';
    }else if (update == 'departament') {
      title = 'Editar Departamento';
      buttonName = 'Actualizar Departamento';
    }else if (update == 'provider') {
      title = 'Editar Proveedor';
      buttonName = 'Actualizar Proveedor';
    }
    return (
      <div style={styleForm}>
        <AppBar style={{backgroundColor: 'transparent', border: 'none'}}
          title={title}
          showMenuIconButton={false}
        />
        <Card>
          <TextField
            hintText="Nombres"
            value={this.state.name} onChange={this.handleChangeName}
            errorText={this.state.errorName}
            style={inputStyle}
          />
          <div style={{width: '80%', margin: '0 auto'}}>
            <RaisedButton label={buttonName} primary={true} onClick={::this.handleUpdate} style={inputStyle}/>
          </div>
        </Card>
      </div>
    );
  }
}
