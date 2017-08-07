import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import { inventory, incidence, product, ticket, user } from '../../api/constants';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  Card,
  CardActions, CardHeader, CardText,
  FlatButton,
  AppBar,
  RaisedButton,
  Paper,
  TextField,
  CardTitle
} from 'material-ui';

import IconClose from 'material-ui/svg-icons/navigation/close';
import Done from 'material-ui/svg-icons/action/done';
import AutoRenew from 'material-ui/svg-icons/action/autorenew';
import Remove from 'material-ui/svg-icons/content/remove';
import Send from 'material-ui/svg-icons/content/send';

export default class Incidences extends Component {
  constructor(props) {
   super(props);
   this.state = {
     data: null,
     selectedRow: {},
     height: '600px',
     status: null
   };
  }

  componentWillMount = () => {
    this.getIncidences();
  }

  getUser = (id) => {
    let that = this;
    let url = user + '/' + id;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then(function(user) {
      that.setState({user});
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });
  }

  getTicket = (id) => {
    let that = this;
    let url = ticket + '/' + id;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then(function(ticket) {
      let idUser = ticket.user[0].id
      if (idUser != undefined) {
        that.getUser(idUser);
      }
      // that.setState({product});
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });
  }

  getProduct = (id) => {
    let that = this;
    let url = product + '/' + id;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then(function(product) {
      that.setState({product});
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });
  }


  getIncidences = () => {
    let that = this;
    fetch(incidence, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then(function(data) {
      console.log(data);
      that.setState({data});
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });
  }

  rowSelection = (row) => {
    let id = row[0];
    let that = this;
    let idInventario = that.state.data[id].inventory[0].id;
    let idTicket = that.state.data[id].ticket[0].id;
    if (id != undefined) {
      setTimeout(function() {
        that.setState({
          selection: that.state.data[id],
          height: '300px',
          delete: false,
          status: null
        });
        that.getProduct(idInventario);
        that.getTicket(idTicket);
      }, 500);
    }
  }

  handleUpdate = (state) => {
    const { id } = this.state.selection;
    let { status } = this.state;
    let url = incidence + '/' + id;
    let credentials = {
      state,
      status
    }
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(res => res.json())
      .then(res => {
        if (res.id) {
          this.getIncidences();
          this.setState({
            selection: null
          })
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

  handleChangeStatus = (event) => {
   this.setState({
     status: event.target.value
   });
  }

  renderActions = (state) => {
    if (state != "Cerrado") {
      const styleText = {
        width: '90%',
        marginRight: '5%',
        marginLeft: '5%',
      };
      const style = {
        width: '70%',
        marginRight: '15%',
        marginLeft: '15%',
      };
      return (
        <div>
          <Paper zDepth={2} style={style}>
            <TextField hintText="Comentario sobre la incidencia" style={styleText} underlineShow={false}
              value={this.state.status} onChange={this.handleChangeStatus} multiLine={true}
              rowsMax={20}/>
            <Divider />
          </Paper>
          <CardActions style={{width: '80%', marginLeft: '10%'}}>
            <RaisedButton label="Activo"  icon={<Done />}
              style={{margin: 12}} primary={true} onClick={() => this.handleUpdate('Activo')} />
            <RaisedButton label="Inactivo" icon={<Remove />}
              style={{margin: 12}} primary={true} onClick={() => this.handleUpdate('Inactivo')} />
            <RaisedButton label="En Proceso" icon={<AutoRenew />}
              style={{margin: 12}} primary={true} onClick={() => this.handleUpdate('En proceso')} />
            <RaisedButton label="Cerrado" icon={<IconClose />}
              style={{margin: 12}} primary={true} onClick={() => this.handleUpdate('Cerrado')} />
            <RaisedButton label="Enviar Comentario" icon={<Send />}
              style={{margin: 12}} primary={true} onClick={() => this.handleUpdate()} />
          </CardActions>
        </div>
      )
    }
    return null;
  }

  renderProduct = () => {
  if (this.state.selection != null || this.state.selection != undefined) {
      const style = {
        marginTop: 10,
        marginBottom: 10
      }
      const content = {
        width: '95%',
        marginRight: '2.5%',
        marginLeft: '2.5%',
        paddingBottom: '2%'
      }
      const contentTicket = {
        width: '90%',
        marginRight: '5%',
        marginLeft: '5%',
        marginTop: '2%',
        marginBottom: '2%'
      }
      const styleText = {
        marginLeft: 20,
      };
      let obj = this.state.selection;
      let product = this.state.product;
      let user = this.state.user;
      let createdBy = 'Incidencia registrada por '+ this.checkIfExist(obj.user[0], 'userName') +' el: ' + this.formatDate(obj.createdAt);
      return(
        <Card style={style}>
          <CardHeader
            title={obj.status}
            subtitle={createdBy}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <Paper zDepth={2} style={content}>

              <Table
                height="50"
                selectable={false}
                multiSelectable={false}
              >
                <TableHeader displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>Nombre</TableHeaderColumn>
                    <TableHeaderColumn>Serial</TableHeaderColumn>
                    <TableHeaderColumn>Modelo</TableHeaderColumn>
                    <TableHeaderColumn>Marca</TableHeaderColumn>
                    <TableHeaderColumn>Fecha</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                      <TableRowColumn>{this.checkIfExist(product, 'id')}</TableRowColumn>
                      <TableRowColumn>{this.checkIfExist(product, 'name')}</TableRowColumn>
                      <TableRowColumn>{this.checkIfExist(product, 'serial')}</TableRowColumn>
                      <TableRowColumn>{this.checkIfExist(product, 'model')}</TableRowColumn>
                      <TableRowColumn>{this.checkIfExist(product, 'brand')}</TableRowColumn>
                      <TableRowColumn>{this.formatDate(this.checkIfExist(obj.inventory[0], 'createdAt'))}</TableRowColumn>
                    </TableRow>
                </TableBody>
              </Table>

              <Table
                height="50"
                selectable={false}
                multiSelectable={false}
              >
                <TableHeader displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>Nombre</TableHeaderColumn>
                    <TableHeaderColumn>Apellido</TableHeaderColumn>
                    <TableHeaderColumn>Correo Electronico</TableHeaderColumn>
                    <TableHeaderColumn>Sede</TableHeaderColumn>
                    <TableHeaderColumn>Departamento</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                      <TableRowColumn>{this.checkIfExist(user, 'name')}</TableRowColumn>
                      <TableRowColumn>{this.checkIfExist(user, 'lastName')}</TableRowColumn>
                      <TableRowColumn>{this.checkIfExist(user, 'email')}</TableRowColumn>
                      <TableRowColumn>{this.checkIfExist(user, 'sede')}</TableRowColumn>
                      <TableRowColumn>{this.checkIfExist(user, 'departament')}</TableRowColumn>
                    </TableRow>
                </TableBody>
              </Table>

              <Paper zDepth={4} style={contentTicket}>
                <CardTitle title={this.checkIfExist(obj.ticket[0], 'title')}/>
                <CardText>
                  {this.checkIfExist(obj.ticket[0], 'content')}
                </CardText>
              </Paper>
              { this.renderActions(obj.state) }
            </Paper>

          </CardText>
        </Card>
      );
    }
    return (
      <AppBar style={{backgroundColor: 'transparent', border: 'none'}}
        title="Lista de Incidencias"
        showMenuIconButton={false}
      />
    );
  }

  formatDate(date) {
    var d = new Date(date);
    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                      d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return datestring;
  }

  confirmation = (value) => {
    if (value) {
      let id = '/' + this.state.id;
      let url = inventory + id;
      fetch(url, {
        method: 'DELETE'
      }).then(res => res.json())
        .then(res => {
          this.setState({
            selection: null,
            delete: false,
            id: null
          });
          this.getInventories();
        });
    }else {
      this.setState({
        delete: false,
        selection: null,
        id: null,
        height: '400px'
      });
    }
  }

  updateProduct = (obj) => {
    const { dispatch, router } = this.props;
    let inventoryToUpdate = {
      inventoryToUpdate: obj
    };
    dispatch(inventoryToUpdate);
    router.push('/editinventory');
  }

  delete = (obj) => {
    this.setState({
      delete: true,
      id: obj.id
    });
  }

  renderConfirmation = () => {
    if (this.state.delete == true) {
      const style = {
        width: '90%',
        marginLeft: '5%',
        marginRigth: '5%',
        alignItems: 'center',
        marginTop: 15
      }

      const styleButton = {
        marginBottom: 10
      }

      let deleteUser = 'Si confirmo que deseo eliminar este Inventario';

      return (
        <CardActions style={style}>
          <RaisedButton label={deleteUser} onClick={() => this.confirmation(true)} style={styleButton} primary={true} fullWidth={true} />
          <RaisedButton label='No eliminar' onClick={() => this.confirmation(false)} secondary={true} fullWidth={true} />
        </CardActions>
      );
    }
    return null;
  }

  renderButtones = () => {
    if (this.state.selection != null || this.state.selection != undefined) {
      let titleEdit = 'Editar el Inventario ' + this.state.selection.observations;
      let titleDelete = 'Eliminar el Inventario ' + this.state.selection.observations;
      const style = {
        width: '90%',
        marginLeft: '5%',
        marginRigth: '5%',
        alignItems: 'center'
      }

      const styleButton = {
        marginBottom: 10
      }

      return (
        <CardActions style={style}>
          <RaisedButton label={titleEdit} onClick={() => this.updateProduct(this.state.selection)} style={styleButton} primary={true} fullWidth={true} />
          <RaisedButton label={titleDelete} onClick={() => this.delete(this.state.selection)} secondary={true} fullWidth={true} />
          { this.renderConfirmation() }
        </CardActions>
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
    const data = this.state.data;
    const styleTable = {
      width: '90%',
      marginLeft: '5%',
      marginRigth: '5%',
      paddingBottom: 30,
    }

    if (data != null) {
      return(
        <div style={styleTable}>
        { this.renderProduct() }
        <Table onRowSelection={this.rowSelection} height={this.state.height}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Observacion de la Incidencia</TableHeaderColumn>
              <TableHeaderColumn>Estado</TableHeaderColumn>
              <TableHeaderColumn>Ticket</TableHeaderColumn>
              <TableHeaderColumn>Inventario</TableHeaderColumn>
              <TableHeaderColumn>Gestor</TableHeaderColumn>
              <TableHeaderColumn>Fecha</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map( (row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{data[index].status}</TableRowColumn>
                  <TableRowColumn>{data[index].state}</TableRowColumn>
                  <TableRowColumn>{this.checkIfExist(data[index].ticket[0], 'title')}</TableRowColumn>
                  <TableRowColumn>{this.checkIfExist(data[index].inventory[0], 'observations')}</TableRowColumn>
                  <TableRowColumn>{this.checkIfExist(data[index].user[0], 'userName')}</TableRowColumn>
                  <TableRowColumn>{this.formatDate(data[index].createdAt)}</TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

        </div>
      );
    }
    return null;
  }
}
