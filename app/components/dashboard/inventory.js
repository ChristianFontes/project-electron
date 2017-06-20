import React, { Component } from 'react';
import {TextField, RaisedButton, AppBar, Card} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { sede, product, inventory } from '../../api/constants';

export default class Inventory extends Component {

  constructor(props) {
   super(props);
   this.state = {
     observations: '',
     quantity: '',
     errorObservations: '',
     errorQuantity: '',
     arraySedes: [],
     valueSedes: 1,
     arrayProducts: [],
     valueProducts: 1,
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

  handleRegister = () => {
    const { id } = this.props;
    const { observations, quantity, valueProducts, valueSedes } = this.state;
    let credentials = {
      observations, quantity, user: id, products: valueProducts, sede: valueSedes
    }
    if (quantity == 0) {
      this.setState({errorQuantity: 'La cantidad tiene que ser mayor a 0'});
    }else {
      this.setState({errorQuantity: ''});
      fetch(inventory, {
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
              observations: '',
              quantity: '',
              errorObservations: '',
              errorQuantity: '',
              valueSedes: 1,
              valueProducts: 1,
            });
          } else {
            if (res.invalidAttributes.observations) {
              if (res.invalidAttributes.observations[0].rule == 'required') {
                this.setState({errorObservations: 'La Observacion es requerida'});
              }
            }
          }
        }
      );
    }
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
          type='number'
        /><br/>
        <div style={{width: '50%', margin: '0 auto'}}>
          <RaisedButton label="Registrar Inventario" primary={true} onClick={::this.handleRegister}/>
        </div>
      </div>
    );
  }
}
