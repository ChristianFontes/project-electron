import React, { Component } from 'react';
import {TextField, RaisedButton, AppBar, Card} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { incidence, inventory } from '../../api/constants';

export default class Inventory extends Component {

  constructor(props) {
   super(props);
   this.state = {
     status: '',
     errorStatus: '',
     arrayInventory: []
   };
  }

  componentWillMount() {
    let that = this;
    fetch(inventory) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then(function(data) {
      const items = [];
      for (let i = 0; i < data.length; i++ ) {
        if (that.state.valueInventory == null) {
          that.setState({valueInventory: data[i].id});
        }
        items.push(<MenuItem value={data[i].id} key={i} primaryText={`${data[i].observations}`} />);
      }
      that.setState({arrayInventory: items});
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });
  }

  handleChangeStatusIncidence = (event) => {
   this.setState({
     status: event.target.value
   });
  }

  handleChangeInventory = (event, index, value) => {
    this.setState({valueInventory: value});
  };

  handleRegister = () => {
    const { id } = this.props;
    const { status, valueInventory } = this.state;
    let credentials = {
      user: id, status, inventory: valueInventory
    }
    fetch(incidence, {
      method: 'Post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(res => res.json())
      .then(res => {
        if (res.id) {
          this.setState({
            status: '',
            errorStatus: ''
          });
        } else {
          if (res.invalidAttributes.status) {
            if (res.invalidAttributes.status[0].rule == 'required') {
              this.setState({errorStatus: 'El Estado de Incidencia es requerido'});
            }
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
          hintText="Estado de Incidencia"
          value={this.state.status} onChange={this.handleChangeStatusIncidence}
          errorText={this.state.errorStatus}
        /><br/>
        <SelectField
          value={this.state.valueInventory}
          onChange={this.handleChangeInventory}
          maxHeight={200}
        >
          {this.state.arrayInventory}
        </SelectField><br/>
        <div style={{width: '50%', margin: '0 auto'}}>
          <RaisedButton label="Registrar Inventario" primary={true} onClick={::this.handleRegister}/>
        </div>
      </div>
    );
  }
}
