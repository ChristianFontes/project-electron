import React, { Component } from 'react';
import {TextField, RaisedButton, AppBar} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { sede, product, inventory } from '../../api/constants';

export default class Inventory extends Component {

  constructor(props) {
   super(props);
   const { observations, quantity, id, sede, products, user } = this.props.inventory;
   console.log(this.props);
   this.state = {
     id,
     observations,
     quantity,
     errorObservations: '',
     errorQuantity: '',
     arraySedes: [],
     valueSedes: sede[0].id,
     arrayProducts: [],
     valueProducts: products[0].id,
     user: user[0].id
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
      that.setState({arraySedes: items});
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });

    fetch(product) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then(function(data) {
      const items = [];
      for (let i = 0; i < data.length; i++ ) {
        items.push(<MenuItem value={data[i].id} key={i} primaryText={`${data[i].name}`} />);
      }
      that.setState({arrayProducts: items});
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });
  }

  handleChangeProducts = (event, index, value) => {
    this.setState({valueProducts: value});
  };

  handleChangeSedes = (event, index, value) => {
    this.setState({valueSedes: value});
  };

  handleChangeObservations = (event) => {
   this.setState({
     observations: event.target.value
   });
  }

  handleChangeQuantity = (event) => {
   this.setState({
     quantity: event.target.value
   });
  }

  handleUpdate = () => {
    const { observations, quantity, valueProducts, valueSedes, id, user } = this.state;
    let credentials = {
      observations, quantity, user, products: valueProducts, sede: valueSedes
    }
    let url = inventory + '/' + id;
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
            observations: '',
            quantity: 0,
            errorObservations: '',
            errorQuantity: '',
            valueSedes: 1,
            valueProducts: 1,
          });
        } else {
          if (res.invalidAttributes.name) {
            if (res.invalidAttributes.name[0].rule == 'required') {
              this.setState({errorName: 'El nombre es requerido'});
            }
          }
          if (!res.invalidAttributes.name) {
            this.setState({errorName: ''});
          }
          if (res.invalidAttributes.serial) {
            if (res.invalidAttributes.serial[0].rule == 'required') {
              this.setState({errorSerial: 'El serial es requerido'});
            }
          }
          if (!res.invalidAttributes.serial) {
            this.setState({errorSerial: ''});
          }
          if (res.invalidAttributes.model) {
            if (res.invalidAttributes.model[0].rule == 'required') {
              this.setState({errorModel: 'El modelo es requerido'});
            }
          }
          if (!res.invalidAttributes.model) {
            this.setState({errorModel: ''});
          }
          if (res.invalidAttributes.brand) {
            if (res.invalidAttributes.brand[0].rule == 'required') {
              this.setState({errorBrand: 'La marca es requerida'});
            }
          }
          if (!res.invalidAttributes.brand) {
            this.setState({errorBrand: ''});
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
          hintText="Observacion del Inventario"
          value={this.state.observations} onChange={this.handleChangeObservations}
          errorText={this.state.errorObservations}
        /><br/>
        <SelectField
          value={this.state.valueSedes}
          onChange={this.handleChangeSedes}
          maxHeight={200}
        >
          {this.state.arraySedes}
        </SelectField><br/>
        <SelectField
          value={this.state.valueProducts}
          onChange={this.handleChangeProducts}
          maxHeight={200}
        >
          {this.state.arrayProducts}
        </SelectField><br/>
        <TextField
          hintText="Cantidad de articulos"
          value={this.state.quantity} onChange={this.handleChangeQuantity}
          errorText={this.state.errorQuantity}
        /><br/>
        <div style={{width: '50%', margin: '0 auto'}}>
          <RaisedButton label="Actualizar Inventario" primary={true} onClick={::this.handleUpdate}/>
        </div>
      </div>
    );
  }
}
