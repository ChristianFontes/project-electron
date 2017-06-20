import React, { Component } from 'react';
import {TextField, RaisedButton, AppBar} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { provider, product } from '../../api/constants';

export default class Product extends Component {
  constructor(props) {
   super(props);
   console.log(this.props);
   const { name, brand, model, serial, id } = this.props.product;
   this.state = {
     id,
     userID: this.props.product.user[0].id,
     name,
     serial,
     model,
     brand,
     errorName: '',
     errorSerial: '',
     errorModel: '',
     errorBrand: '',
     arrayProvider: [],
     valueProvider: this.props.product.provider[0].id,
   };
  }

  componentWillMount() {
    let that = this;
    fetch(provider) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then(function(data) {
      const items = [];
      for (let i = 0; i < data.length; i++ ) {
        items.push(<MenuItem value={data[i].id} key={i} primaryText={`Proveedor ${data[i].name}`} />);
      }
      that.setState({arrayProvider: items});
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });
  }

  handleChangeProvider = (event, index, value) => {
    this.setState({valueProvider: value});
  };

  handleChangeName = (event) => {
   this.setState({
     name: event.target.value
   });
  }

  handleChangeSerial = (event) => {
   this.setState({
     serial: event.target.value
   });
  }

  handleChangeModel = (event) => {
   this.setState({
     model: event.target.value
   });
  }

  handleChangeBrand = (event) => {
   this.setState({
     brand: event.target.value
   });
  }

  handleRegister = () => {

    const { name, serial, model, brand, valueProvider, userID, id } = this.state;
    let credentials = {
      name, serial, model, brand, user: userID, provider: valueProvider
    }
    let url = product + '/' + id;
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
            serial: '',
            model: '',
            brand: '',
            errorName: '',
            errorSerial: '',
            errorModel: '',
            errorBrand: '',
            valueProvider: 1,
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
          hintText="Nombre del Producto"
          value={this.state.name} onChange={this.handleChangeName}
          errorText={this.state.errorName}
        /><br/>
        <TextField
          hintText="Serial del Producto"
          value={this.state.serial} onChange={this.handleChangeSerial}
          errorText={this.state.errorSerial}
        /><br/>
        <TextField
          hintText="Modelo del Producto"
          value={this.state.model} onChange={this.handleChangeModel}
          errorText={this.state.errorModel}
        /><br/>
        <TextField
          hintText="Marca del Producto"
          value={this.state.brand} onChange={this.handleChangeBrand}
          errorText={this.state.errorBrand}
        /><br/>
        <SelectField
          value={this.state.valueProvider}
          onChange={this.handleChangeProvider}
          maxHeight={200}
        >
          {this.state.arrayProvider}
        </SelectField>
        <div style={{width: '50%', margin: '0 auto'}}>
          <RaisedButton label="Registrar" primary={true} onClick={::this.handleRegister}/>
        </div>
      </div>
    );
  }
}
