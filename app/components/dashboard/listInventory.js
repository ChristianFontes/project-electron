import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import { inventory, listInventories } from '../../api/constants';
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
  Tabs,
   Tab
} from 'material-ui';

export default class ListMember extends Component {
  constructor(props) {
   super(props);
   this.state = {
     data: null,
     listInventories: null,
     selectedRow: {},
     height: '400px',
     value: null,
   };
  }

  componentWillMount = () => {
    this.getInventories();
    this.getListInventories();
  }

  getListInventories = () => {
    let that = this;
    fetch(listInventories, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then(function(listInventories) {
      if (that.state.value == null) {
        that.setState({
          value: listInventories[0].name
        });
      }
      that.setState({listInventories});
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });
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
      let arrayWithProducts = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].products[0] != undefined) {
          arrayWithProducts.push(data[i]);
        }
      }
      that.setState({data: arrayWithProducts});
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });
  }

  rowSelection = (row) => {
    let contador = 0;
    let id = row[0];
    let that = this;
    if (id != undefined) {
      let allData = this.state.data;
      let value = this.state.value;
      let data = [];
      for (var i = 0; i < allData.length; i++) {
        if (allData[i].sede[0].name == value) {
          if (id == contador) {
            that.setState({
              selection: allData[i],
              height: '200px',
              delete: false
            });
          }
          contador++;
        }
      }
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
      let createdBy = 'Inventario registrado el: ' + this.formatDate(obj.createdAt);
      let serialAndName = this.checkIfExist(obj.products[0], 'serial') + ' ' + this.checkIfExist(obj.products[0], 'name');
      let brandAndModel = this.checkIfExist(obj.products[0], 'brand') + ', ' + this.checkIfExist(obj.products[0], 'model');
      let nameAndLastName = this.checkIfExist(obj.user[0], 'name') + ' ' + this.checkIfExist(obj.user[0], 'lastName');
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
                    primaryText={this.checkIfExist(obj.sede[0], 'name')}
                  />
                  <Divider inset={true} />
                  <Subheader>Gestor</Subheader>
                  <ListItem
                    leftAvatar={<Avatar size={32}>G</Avatar>}
                    primaryText={nameAndLastName}
                    secondaryText={
                      <p>
                        <span style={{color: darkBlack}}>{this.checkIfExist(obj.user[0], 'userName')} </span>
                        {this.checkIfExist(obj.user[0], 'email')}
                      </p>
                    }
                  />
                </List>
            </div>
            <CardActions>
              <FlatButton label="Cerrar" onClick={() => this.setState({
                selection: null,
                height: '400px'
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
            id: null,
            height: '400px'
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
      let titleEdit = 'Editar el Inventario ' + this.state.selection.products[0].name + ' ' + this.state.selection.products[0].serial;
      let titleDelete = 'Eliminar el Inventario ' + this.state.selection.products[0].name + ' ' + this.state.selection.products[0].serial;
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
      }else if (type == 'email') {
        return data.email;
      }else if (type == 'brand') {
        return data.brand;
      }else if (type == 'model') {
        return data.model;
      }else if (type == 'serial') {
        return data.serial;
      }else if (type == 'lastName') {
        return data.lastName;
      }
    }else{
      return null;
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  renderTab = () => {
    let allData = this.state.data;
    let value = this.state.value;
    let data = [];
    for (var i = 0; i < allData.length; i++) {
      if (allData[i].sede[0].name == value) {
        data.push(allData[i]);
      }
    }
    if (data != null) {
      return (
        <Table onRowSelection={this.rowSelection} height={this.state.height}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Producto</TableHeaderColumn>
              <TableHeaderColumn>Serial</TableHeaderColumn>
              <TableHeaderColumn>Modelo</TableHeaderColumn>
              <TableHeaderColumn>Marca</TableHeaderColumn>
              <TableHeaderColumn>Sede</TableHeaderColumn>
              <TableHeaderColumn>Gestor</TableHeaderColumn>
              <TableHeaderColumn>Fecha</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map( (row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{this.checkIfExist(data[index].products[0], 'name')}</TableRowColumn>
                  <TableRowColumn>{this.checkIfExist(data[index].products[0], 'serial')}</TableRowColumn>
                  <TableRowColumn>{this.checkIfExist(data[index].products[0], 'model')}</TableRowColumn>
                  <TableRowColumn>{this.checkIfExist(data[index].products[0], 'brand')}</TableRowColumn>
                  <TableRowColumn>{this.checkIfExist(data[index].sede[0], 'name')}</TableRowColumn>
                  <TableRowColumn>{this.checkIfExist(data[index].user[0], 'userName')}</TableRowColumn>
                  <TableRowColumn>{this.formatDate(data[index].createdAt)}</TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      );
    }
    return null;
  }

  renderTabs = () => {
    const data = this.state.listInventories;
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };
    if (data != null) {
      return (
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
        {
          data.map( (row, index) => (
            <Tab label={data[index].name} value={data[index].name} key={index}>
            </Tab>
          ))
        }
        </Tabs>
      );
    }
    return null;
  }

  render() {
    const data = this.state.data;
    const styleTable = {
      width: '90%',
      marginLeft: '5%',
      marginRigth: '5%',
      paddingBottom: 30,
    }

    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };

    if (data != null) {
      return(
        <div style={styleTable}>
        { this.renderProduct() }
        { this.renderTabs() }
        { this.renderTab() }

        { this.renderButtones() }
        </div>
      );
    }
    return null;
  }
}
