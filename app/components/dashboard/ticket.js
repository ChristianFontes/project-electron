import React, { Component } from 'react';
import { TextField, RaisedButton, Card, AppBar } from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { ticket } from '../../api/constants';

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
     titleAppBar = 'Crear un nuevo Ticket'
   }

   this.state = {
    tickeTitle,
    ticketContent,
    showButton,
    titleAppBar
   };
  }

  componentWillMount() {
    // let that = this;
    // fetch(sede) // Call the fetch function passing the url of the API as a parameter
    // .then((resp) => resp.json())
    // .then(function(data) {
    //   const items = [];
    //   for (let i = 0; i < data.length; i++ ) {
    //     items.push(<MenuItem value={data[i].id} key={i} primaryText={`Sede de ${data[i].name}`} />);
    //   }
    //   that.setState({arraySede: items});
    // })
    // .catch(function(err) {
    //     // This is where you run code if the server returns any errors
    //     console.log(err);
    // });
  }

  handleChangeName = (event) => {
   this.setState({
     tickeTitle: event.target.value
   });
  }

  handleChangeContent = (event) => {
   this.setState({
     ticketContent: event.target.value
   });
  }

  handleCreate = () => {
    let data = {
      title: this.state.tickeTitle,
      content: this.state.ticketContent,
      user: this.props.id
    }
    fetch(ticket, {
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
          if (res.invalidAttributes.title) {
            if (res.invalidAttributes.title[0].rule == 'required') {
              this.setState({errorTitle: 'El Titulo es requerido'});
            }
          }
          if (!res.invalidAttributes.title) {
            this.setState({errorTitle: ''});
          }
          if (res.invalidAttributes.content) {
            if (res.invalidAttributes.content[0].rule == 'required') {
              this.setState({errorContent: 'El contenido es requerido'});
            }
          }
          if (!res.invalidAttributes.content) {
            this.setState({errorContent: ''});
          }
        }else if (res.id) {
          this.setState({
            tickeTitle: '',
            ticketContent: '',
            errorContent: '',
            errorTitle: '',
            ticketCreated: res.createdAt
          })
        }
      });
  }


  handleUpdate = () => {
    // const { id } = this.props.data;
    // const { goBack } = this.props;
    //
    // const url = register + '/' + id;
    // let credentials = {
    //   name: this.state.name,
    //   lastName: this.state.lastName,
    //   email: this.state.email,
    //   typeMember: 'Empleado',
    //   userName: this.state.userName,
    //   password: this.state.password,
    //   sede: this.state.valueSede,
    //   departament: this.state.valueDepartament
    // }
    // fetch(url, {
    //   method: 'PUT',
    //   headers: {
    //     'Accept': 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(credentials)
    // }).then(res => res.json())
    //   .then(res => {
    //     console.log(res);
    //     if (res.user) {
    //       this.setState({
    //         name: '',
    //         lastName: '',
    //         email: '',
    //         password: '',
    //         userName: '',
    //         errorUserName: '',
    //         errorEmail: '',
    //         errorPassword: '',
    //         errorName: '',
    //         errorLastName: '',
    //       });
    //       goBack();
    //     }
    //     if (res.err) {
    //       if (res.err.invalidAttributes.name) {
    //         if (res.err.invalidAttributes.name[0].rule == 'required') {
    //           this.setState({errorName: 'El nombre es requerido'});
    //         }
    //       }
    //       if (!res.err.invalidAttributes.name) {
    //         this.setState({errorName: ''});
    //       }
    //       if (res.err.invalidAttributes.lastName) {
    //         if (res.err.invalidAttributes.lastName[0].rule == 'required') {
    //           this.setState({errorLastName: 'El apellido es requerido'});
    //         }
    //       }
    //       if (!res.err.invalidAttributes.lastName) {
    //         this.setState({errorLastName: ''});
    //       }
    //       if (res.err.invalidAttributes.userName) {
    //         if (res.err.invalidAttributes.userName[0].rule == 'required') {
    //           this.setState({errorUserName: 'El nombre de usuario es requerido'});
    //         }
    //       }
    //       if (!res.err.invalidAttributes.userName) {
    //         this.setState({errorUserName: ''});
    //       }
    //       if (res.err.invalidAttributes.email) {
    //         if (res.err.invalidAttributes.email[0].rule == 'email') {
    //           this.setState({errorEmail: 'El email no es valido'});
    //         }
    //       }
    //       if (!res.err.invalidAttributes.email) {
    //         this.setState({errorEmail: ''});
    //       }
    //       if (res.err.invalidAttributes.password) {
    //         if (res.err.invalidAttributes.password[0].rule == 'required') {
    //           this.setState({errorPassword: 'El password es requerido'});
    //         }
    //       }
    //       if (!res.err.invalidAttributes.password) {
    //         this.setState({errorPassword: ''});
    //       }
    //     }
    //   }
    // );
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
          <RaisedButton label="Crear nuevo Ticket" primary={true} onClick={::this.handleCreate}/>
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
        <h3 style={style}>Ticket creado con exito</h3>
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
            hintText="Titulo del Ticket"
            value={this.state.tickeTitle} onChange={this.handleChangeName}
            errorText={this.state.errorTitle}
            style={style}
          /><br/>
          <TextField
            hintText="Contenido"
            value={this.state.ticketContent} onChange={this.handleChangeContent}
            errorText={this.state.errorContent}
            multiLine={true}
            rowsMax={20}
            style={style}
          /><br/>
          { this.buttonAction() }
        </Card>
      </div>
    );
  }
}
