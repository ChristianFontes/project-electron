import React, { Component } from 'react';
import {TextField, RaisedButton, AppBar, Card} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
  sede,
  product,
  inventory,
  listSerialProduct,
  listNameProduct,
  listModelProduct,
  listBrandProduct
} from '../../api/constants';

export default class Inventory extends Component {

  constructor(props) {
   super(props);
   this.state = {
     observations: 'Sin observaciones',
     arraySedes: [],
     valueSedes: null,
     arrayProductsName: [],
     valueProductsName: null,
     arrayProductsModel: [],
     valueProductsModel: null,
     arrayProductsBrand: [],
     valueProductsBrand: null,
     arrayProductsSerial: [],
     valueProductsSerial: null,
     create: true,
     numberSeriales: 0
   };
  }

  componentDidUpdate = (prevProps, prevState) => {
    let that = this;
    const { valueProductsName, valueProductsModel, valueProductsBrand, name, model, brand } = this.state;
    if (prevState.valueProductsName !== valueProductsName ||
        prevState.valueProductsModel !== valueProductsModel ||
        prevState.valueProductsBrand !== valueProductsBrand) {
      fetch(listSerialProduct, {
        method: 'Post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: valueProductsName,
          model: valueProductsModel,
          brand: valueProductsBrand
        })
      }).then(res => res.json())
        .then(res => {
          if (res.length > 0) {
            const items = [];
            for (let i = 0; i < res.length; i++ ) {
              if (that.state.valueProductsSerial == null) {
                that.setState({valueProductsSerial: res[i].id});
              }
              items.push(<MenuItem value={res[i].id} key={i} primaryText={`Serial ${res[i].serial}`} />);
            }
            that.setState({
              arrayProductsSerial: items,
              create: true
            });
          }else {
            that.setState({
              arrayProductsSerial: [],
              create: false
            });
          }
        }
      );
    }
  }

  componentWillMount() {
    let that = this;
    fetch(sede) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then(function(data) {
      if (data.length == 0) {
        that.setState({create: false});
      }else {
        const items = [];
        for (let i = 0; i < data.length; i++ ) {
          if (that.state.valueSedes == null) {
            that.setState({valueSedes: data[i].id});
          }
          items.push(<MenuItem value={data[i].id} key={i} primaryText={`Sede de ${data[i].name}`} />);
        }
        that.setState({arraySedes: items});
      }
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });

    fetch(listNameProduct) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then(function(data) {
      if (data.length == 0) {
        that.setState({create: false});
      }else {
        const items = [];
        for (let i = 0; i < data.length; i++ ) {
          if (that.state.valueProducts == null) {
            that.setState({valueProductsName: data[i].name});
          }
          items.push(<MenuItem value={data[i].name} key={i} primaryText={`${data[i].name}`} />);
        }
        that.setState({arrayProductsName: items});
      }
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });

    fetch(listModelProduct) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then(function(data) {
      if (data.length == 0) {
        that.setState({create: false});
      }else {
        const items = [];
        for (let i = 0; i < data.length; i++ ) {
          if (that.state.valueProducts == null) {
            that.setState({valueProductsModel: data[i].model});
          }
          items.push(<MenuItem value={data[i].model} key={i} primaryText={`${data[i].model}`} />);
        }
        that.setState({arrayProductsModel: items});
      }
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });

    fetch(listBrandProduct) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then(function(data) {
      if (data.length == 0) {
        that.setState({create: false});
      }else {
        const items = [];
        for (let i = 0; i < data.length; i++ ) {
          if (that.state.valueProducts == null) {
            that.setState({valueProductsBrand: data[i].brand});
          }
          items.push(<MenuItem value={data[i].brand} key={i} primaryText={`${data[i].brand}`} />);
        }
        that.setState({arrayProductsBrand: items});
      }
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });
  }

  handleChangeProductsName = (event, index, value) => {
    this.setState({valueProductsName: value});
  };

  handleChangeProductsModel = (event, index, value) => {
    this.setState({valueProductsModel: value});
  };

  handleChangeProductsBrand = (event, index, value) => {
    this.setState({valueProductsBrand: value});
  };

  handleChangeSedes = (event, index, value) => {
    this.setState({valueSedes: value});
  };

  handleChangeProductsSerial = (event, index, value) => {
    this.setState({valueProductsSerial: value});
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

  afterRegister = () => {
    let that = this;
    const { valueProductsName, valueProductsModel, valueProductsBrand, name, model, brand } = this.state;
      fetch(listSerialProduct, {
        method: 'Post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: valueProductsName,
          model: valueProductsModel,
          brand: valueProductsBrand
        })
      }).then(res => res.json())
        .then(res => {
          if (res.length > 0) {
            const items = [];
            for (let i = 0; i < res.length; i++ ) {
              if (that.state.valueProductsSerial == null) {
                that.setState({valueProductsSerial: res[i].id});
              }
              items.push(<MenuItem value={res[i].id} key={i} primaryText={`Serial ${res[i].serial}`} />);
            }
            that.setState({
              arrayProductsSerial: items,
              create: true
            });
          }else {
            that.setState({
              arrayProductsSerial: [],
              create: false
            });
          }
        }
      );
  }

  handleRegister = () => {
    const { id } = this.props;
    const { observations, quantity, valueProductsSerial, valueSedes } = this.state;
    let credentials = {
      observations, quantity, user: id, products: valueProductsSerial, sede: valueSedes
    }
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
            observations: 'Sin observaciones'
          });
          this.afterRegister();
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

  renderButton = () => {
    if (this.state.create) {
      return(
        <div>
        <SelectField
          value={this.state.valueProductsSerial}
          onChange={this.handleChangeProductsSerial}
          maxHeight={200}
        >
          {this.state.arrayProductsSerial}
        </SelectField><br/>
        <div style={{width: '50%', margin: '0 auto'}}>
          <RaisedButton label="Registrar" primary={true} onClick={::this.handleRegister}/>
        </div>
        </div>
      )
    }
    return null;
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
          value={this.state.valueProductsName}
          onChange={this.handleChangeProductsName}
          maxHeight={200}
        >
          {this.state.arrayProductsName}
        </SelectField><br/>
        <SelectField
          value={this.state.valueProductsModel}
          onChange={this.handleChangeProductsModel}
          maxHeight={200}
        >
          {this.state.arrayProductsModel}
        </SelectField><br/>
        <SelectField
          value={this.state.valueProductsBrand}
          onChange={this.handleChangeProductsBrand}
          maxHeight={200}
        >
          {this.state.arrayProductsBrand}
        </SelectField><br/>
        {this.renderButton()}
      </div>
    );
  }
}
/*
<TextField
  hintText="Cantidad de articulos"
  value={this.state.quantity} onChange={this.handleChangeQuantity}
  errorText={this.state.errorQuantity}
  type='number'
/><br/>
*/
