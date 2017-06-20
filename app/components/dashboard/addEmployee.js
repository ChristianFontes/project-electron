import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText, AppBar } from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'material-ui';
import InputField from './textField';
export default class AddEmployee extends Component {
  render() {
    const card = {
      width: '50%',
      marginLeft: '25%',
      marginRigth: '25%'
    }
    const inputStyle = {
      margin: 50
    }
    return (
      <div style={card}>
        <AppBar style={{backgroundColor: 'transparent', border: 'none'}}
          title="Agregar Nuevo Empleado"
          showMenuIconButton={false}
        />
        <Card>
            <InputField/>
        </Card>
      </div>
    );
  }
}
