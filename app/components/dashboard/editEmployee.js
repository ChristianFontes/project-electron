import React, { Component } from 'react';
import { Card, AppBar } from 'material-ui';
import EditField from './editField';
export default class AddEmployee extends Component {
  render() {
    const { goBack } = this.props;
    const card = {
      width: '50%',
      marginLeft: '25%',
      marginRigth: '25%'
    }
    const inputStyle = {
      margin: 50
    }

    let title = 'Editar Empleado';
    return (
      <div style={card}>
        <AppBar style={{backgroundColor: 'transparent', border: 'none'}}
          title={title}
          showMenuIconButton={false}
        />
        <Card>
            <EditField data={this.props.user} goBack={goBack}/>
        </Card>
      </div>
    );
  }
}
