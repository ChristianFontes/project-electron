import React, { Component } from 'react';
import { TextField, RaisedButton, Card, AppBar } from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { sede } from '../../api/constants';

export default class InputField extends Component {

  constructor(props) {
   super(props);
   let tickeTitle = '',
       ticketContent = '',
       showButton = '',
       titleAppBar = '';
   if (this.props.ticket) {
     const { title, content } = this.props.ticket;
     tickeTitle = title;
     ticketContent = content;
   }

   if (this.props.create) {
     showButton = 'create';
     titleAppBar = 'Crear una nueva Sede'
   }

   this.state = {
    tickeTitle,
    ticketContent,
    showButton,
    titleAppBar
   };
  }

  handleChangeName = (event) => {
   this.setState({
     tickeTitle: event.target.value
   });
  }

  handleCreate = () => {
    let data = {
      name: this.state.tickeTitle,
    }
    fetch(sede, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.invalidAttributes) {
          if (res.invalidAttributes.name) {
            if (res.invalidAttributes.name[0].rule == 'required') {
              this.setState({errorTitle: 'El Nombre es requerido'});
            }
          }
          if (!res.invalidAttributes.name) {
            this.setState({errorTitle: ''});
          }
        }else if (res.id) {
          this.setState({
            tickeTitle: '',
            errorTitle: '',
            ticketCreated: res.createdAt
          })
        }
      });
  }

  buttonAction = () => {
    if (this.state.showButton == 'create') {
      const style = {
        width: '30%',
        marginLeft: '35%',
        marginRigth: '35%',
        paddingTop: 10,
        paddingBottom: 10
      }
      return(
        <div style={style}>
          <RaisedButton label="Crear nueva Sede" primary={true} onClick={::this.handleCreate}/>
        </div>
      )
    }
    return null;
  }

  showTicketCreated = () => {
    if (this.state.ticketCreated == null) {
      return null;
    }
    if (this.state.ticketCreated !== undefined || this.state.ticketCreated !== null ) {
      let that = this;
      setTimeout(function() {
        that.setState({
          ticketCreated: null
        });
      }, 4000);
      const style = {
        width: '30%',
        marginLeft: '35%',
        marginRigth: '35%',
        paddingTop: 10
      }
      return (
        <h3 style={style}>Sede creada con exito</h3>
      )
    }
    return null;
  }

  render() {
    const styleForm = {
      width: '60%',
      marginLeft: '20%',
      marginRigth: '20%'
    }
    const style = {
      width: '40%',
      marginLeft: '30%',
      marginRigth: '30%',
      paddingTop: 10
    }
    return (
      <div style={styleForm}>
        <AppBar style={{backgroundColor: 'transparent', border: 'none'}}
          title={this.state.titleAppBar}
          showMenuIconButton={false}
        />
        <Card>
          { this.showTicketCreated() }
          <TextField
            hintText="Nombre de la Sede"
            value={this.state.tickeTitle} onChange={this.handleChangeName}
            errorText={this.state.errorTitle}
            style={style}
          /><br/>
          { this.buttonAction() }
        </Card>
      </div>
    );
  }
}
