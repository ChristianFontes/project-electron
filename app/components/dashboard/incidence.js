import React, { Component } from 'react';
import {TextField, RaisedButton, AppBar, Card, CardTitle, CardText} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { incidence, inventory, ticketIncidence } from '../../api/constants';

export default class Inventory extends Component {

  constructor(props) {
   super(props);
   this.state = {
     status: '',
     errorStatus: '',
     arrayInventory: [],
     arrayTicket: [],
     arrayProduct: [],
     arrayUserTicket: [],
     create: true
   };
  }

  callApis = () => {
    let that = this;
    fetch(inventory) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then(function(data) {
      const items = [];
      const product = [];
      if (data.length == 0) {
        that.setState({create: false});
      }else {
        for (let i = 0; i < data.length; i++ ) {
          if (that.state.valueInventory == null) {
            that.setState({valueInventory: i});
          }
          items.push(<MenuItem value={i} key={i} primaryText={`${data[i].products[0].serial}`} />);
          product.push(data[i]);
        }
        that.setState({
          arrayInventory: items,
          arrayProduct: product
        });
      }
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });

    fetch(ticketIncidence) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then(function(data) {
      const items = [];
      const ticketUser = [];
      if (data.length == 0) {
        that.setState({create: false});
      }else {
        let j = 0;
        for (let i = 0; i < data.length; i++ ) {
          if (data[i].user[0] != undefined) {
            if (that.state.valueTicket == null) {
              that.setState({valueTicket: j});
            }
            items.push(<MenuItem value={j} key={j} primaryText={`${data[i].title}`} />);
            ticketUser.push(data[i]);
            j++;
          }
        }
        that.setState({
          arrayTicket: items,
          arrayUserTicket: ticketUser
        });
      }
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });
  }

  componentWillMount() {
    this.callApis();
  }

  handleChangeStatusIncidence = (event) => {
   this.setState({
     status: event.target.value
   });
  }

  handleChangeInventory = (event, index, value) => {
    this.setState({valueInventory: value});
  };

  handleChangeTicket = (event, index, value) => {
    this.setState({valueTicket: value});
  };

  handleRegister = () => {
    const { id } = this.props;
    const { valueInventory, valueTicket, arrayProduct, arrayUserTicket } = this.state;
    let idInventory = arrayProduct[valueInventory].id;
    let idTicket = arrayUserTicket[valueTicket].id;
    let credentials = {
      user: id, inventory: idInventory, state: 'Abierto', ticket: idTicket
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
            errorStatus: '',
            arrayInventory: [],
            arrayTicket: [],
            arrayProduct: [],
            arrayUserTicket: [],
          });
          this.callApis();
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

  renderButton = () => {
    if (this.state.create) {
      return (
        <div style={{width: '50%', margin: '0 auto'}}>
          <RaisedButton label="Registrar" primary={true} onClick={::this.handleRegister}/>
        </div>
      );
    }
    return null;
  }

  renderTicket = () => {
    let ticket = this.state.arrayUserTicket[this.state.valueTicket];
    if (ticket) {
      let showUser = "Creado por: " + this.checkIfExist(ticket.user[0], 'userName');
      return (
        <div>
          <CardTitle title={this.checkIfExist(ticket, 'title')} subtitle={showUser} />
          <CardText>
            {this.checkIfExist(ticket, 'content')}
          </CardText>
        </div>
      );
    }
    return null;
  }

  renderProduct = () => {
    let inventory = this.state.arrayProduct[this.state.valueInventory];
    if (inventory) {
      let product = inventory.products[0];
      let nameAndModel = product.name + ' (' + product.model + ')';
      let serialAndBrand = 'Serial: ' + product.serial + ' Marca: ' + product.brand;
      return (
        <div>
          <CardTitle title={nameAndModel} subtitle={serialAndBrand} />
        </div>
      );
    }
    return null;
  }

  checkIfExist(data, type) {
    if (data !== undefined) {
      if (type == 'userName') {
        return data.userName;
      }else if (type == 'typeMember') {
        return data.typeMember;
      }else if (type == 'observations') {
        return data.observations;
      }else if (type == 'quantity') {
        return data.quantity;
      }else if (type == 'createdAt') {
        return data.createdAt;
      }else if (type == 'title') {
        return data.title;
      }else if (type == 'name') {
        return data.name;
      }else if (type == 'model') {
        return data.model;
      }else if (type == 'brand') {
        return data.brand;
      }else if (type == 'serial') {
        return data.serial;
      }else if (type == 'content') {
        return data.content;
      }else if (type == 'lastName') {
        return data.lastName;
      }else if (type == 'email') {
        return data.email;
      }else if (type == 'sede') {
        return data.sede[0].name;
      }else if (type == 'departament') {
        return data.departament[0].name;
      }else if (type == 'id') {
        return data.id;
      }
    }else{
      return null;
    }
  }

  render() {
    const styleForm = {
      width: '60%',
      marginLeft: '30%',
      marginRigth: '30%',
      paddingBottom: 30,
      paddingTop: 30
    }
    return (
      <div style={styleForm}>
        <SelectField
          value={this.state.valueInventory}
          onChange={this.handleChangeInventory}
          maxHeight={200}
        >
          {this.state.arrayInventory}
        </SelectField><br/>
        { this.renderProduct() }
        <SelectField
          value={this.state.valueTicket}
          onChange={this.handleChangeTicket}
          maxHeight={200}
        >
          {this.state.arrayTicket}
        </SelectField><br/>
        { this.renderTicket() }
        { this.renderButton() }
      </div>
    );
  }
}
