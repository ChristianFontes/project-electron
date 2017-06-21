import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import { inventory } from '../../api/constants';
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
  RaisedButton
} from 'material-ui';

export default class ListMember extends Component {
  constructor(props) {
   super(props);
   this.state = {
     data: null,
     selectedRow: {},
     height: '600px'
   };
  }

  componentWillMount = () => {
    this.getInventories();
  }

  getInventories = () => {
    let that = this;
    fetch(inventory, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then(function(data) {
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
    if (id != undefined) {
      setTimeout(function() {
        that.setState({
          selection: that.state.data[id],
          height: '300px',
          delete: false
        });
      }, 500);
    }
  }

  renderProduct = () => {
  if (this.state.selection != null || this.state.selection != undefined) {
      const style = {
        marginTop: 10,
        marginBottom: 10
      }
      const content = {
        width: '70%',
        marginRight: '15%',
        marginLeft: '15%'
      }
      let obj = this.state.selection;
      console.log(obj);
      let createdBy = 'Inventario registrado el: ' + this.formatDate(obj.createdAt);
      let serialAndName = obj.products[0].serial + ' ' + obj.products[0].name;
      let brandAndModel = obj.products[0].brand + ', ' + obj.products[0].model;
      let nameAndLastName = obj.user[0].name + ' ' + obj.user[0].lastName;
      return(
        <Card style={style}>
          <CardHeader
            title={obj.observations}
            subtitle={createdBy}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <div style={content}>
                <List>
                  <Subheader>Inventario</Subheader>
                  <ListItem
                    leftAvatar={<Avatar size={32}>I</Avatar>}
                    primaryText={obj.observations}
                    secondaryText={
                      <p>
                        <span style={{color: darkBlack}}>Cantidad:  </span>
                        {obj.quantity}
                      </p>
                    }
                  />
                  <Divider inset={true} />
                  <Subheader>Producto</Subheader>
                  <ListItem
                    leftAvatar={<Avatar size={32}>P</Avatar>}
                    primaryText={serialAndName}
                    secondaryText={
                      <p>
                        <span style={{color: darkBlack}}>Marca y Modelo </span>
                        {brandAndModel}
                      </p>
                    }
                  />
                  <Divider inset={true} />
                  <Subheader>Sede</Subheader>
                  <ListItem
                    leftAvatar={<Avatar size={32}>S</Avatar>}
                    primaryText={obj.sede[0].name}
                  />
                  <Divider inset={true} />
                  <Subheader>Gestor</Subheader>
                  <ListItem
                    leftAvatar={<Avatar size={32}>G</Avatar>}
                    primaryText={nameAndLastName}
                    secondaryText={
                      <p>
                        <span style={{color: darkBlack}}>{obj.user[0].userName} </span>
                        {obj.user[0].email}
                      </p>
                    }
                  />
                </List>
            </div>
            <CardActions>
              <FlatButton label="Cerrar" onClick={() => this.setState({
                selection: null,
                height: '250px'
              })} />
            </CardActions>
          </CardText>
        </Card>
      );
    }
    return (
      <AppBar style={{backgroundColor: 'transparent', border: 'none'}}
        title="Lista de Inventarios"
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
      }else if (type == 'name') {
        return data.name;
      }
    }else{
      return null;
    }
  }

  render() {
    const data = this.state.data;
    const styleTable = {
      width: '80%',
      marginLeft: '10%',
      marginRigth: '10%',
      paddingBottom: 30,
    }

    if (data != null) {
      return(
        <div style={styleTable}>
        { this.renderProduct() }
        <Table onRowSelection={this.rowSelection} height={this.state.height}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Observaciones</TableHeaderColumn>
              <TableHeaderColumn>Cantidad</TableHeaderColumn>
              <TableHeaderColumn>Producto</TableHeaderColumn>
              <TableHeaderColumn>Sede</TableHeaderColumn>
              <TableHeaderColumn>Gestor</TableHeaderColumn>
              <TableHeaderColumn>Fecha</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map( (row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{data[index].observations}</TableRowColumn>
                  <TableRowColumn>{data[index].quantity}</TableRowColumn>
                  <TableRowColumn>{this.checkIfExist(data[index].products[0], 'name')}</TableRowColumn>
                  <TableRowColumn>{this.checkIfExist(data[index].sede[0], 'name')}</TableRowColumn>
                  <TableRowColumn>{this.checkIfExist(data[index].user[0], 'userName')}</TableRowColumn>
                  <TableRowColumn>{this.formatDate(data[index].createdAt)}</TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        { this.renderButtones() }
        </div>
      );
    }
    return null;
  }
}