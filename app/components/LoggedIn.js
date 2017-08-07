import React, { Component, PropTypes } from 'react';
import { RaisedButton, Card, FlatButton } from 'material-ui';
import CardOption from './dashboard/cardOption';
import BarUser from './dashboard/barUser';
import Ticket from './dashboard/ticket';
import MyListTicket from './dashboard/myListTicket';
require('pdfmake/build/pdfmake.min.js');
require('pdfmake/build/vfs_fonts.js');
import { records } from '../api/constants';

export default class LoggedIn extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    let that = this;
    fetch(records, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then(function(filter) {
      that.setState({filter});
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });
  }

  formatDate(date) {
    var d = new Date(date);
    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                      d.getFullYear();
    return datestring;
  }

  buildTableBody = (data, columns) => {
    var body = [];
    let that = this;
    body.push(columns);

    data.forEach(function(row, index) {
        var d = new Date(row.createdAt);
        var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                          d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

        var dataRow = [];
        dataRow.push(row.id, row.title, that.checkIfExist(row.user[0], 'userName'), that.checkIfExist(row.user[0], 'typeMember'), datestring);
        body.push(dataRow);
    });
    return body;
  }

  table = (data, columns) => {
      return {
          style: 'tableExample',
          table: {
              body: this.buildTableBody(data, columns),
          }
      };
  }

  pdf = () => {
    const data = this.state.filter.tickets;
    const date = this.state.filter;

    let name = 'Tickets desde ' + this.formatDate(date.from) + ' al ' + this.formatDate(date.to) + '.pdf';
    let subtitle = 'Tickets desde ' + this.formatDate(date.from) + ' al ' + this.formatDate(date.to);

    var docDefinition = {
      content: [
        {text: 'CFQHelpDesk Reporte de Tickets', style: 'header'},
    		{text: subtitle, style: 'subheader'},
    		this.table(data, ['ID', 'Titulo', 'Creado', 'Tipo de Usuario', 'Fecha y Hora'])
      ],
      	styles: {
      		header: {
      			fontSize: 18,
      			bold: true,
      			margin: [0, 0, 0, 10]
      		},
      		subheader: {
      			fontSize: 12,
      			margin: [0, 10, 0, 5]
      		},
      		tableExample: {
            width: '100%',
      			margin: [40, 30, 0, 0],
      		},
      		tableHeader: {
      			bold: true,
      			fontSize: 13,
      			color: 'black'
      		}
      	},
    };
    pdfMake.createPdf(docDefinition).download(name);
  }

  checkIfExist(data, type) {
    if (data !== undefined) {
      if (type == 'userName') {
        return data.userName;
      }else if (type == 'typeMember') {
        return data.typeMember;
      }
    }else{
      return null;
    }
  }

  goToRouter = () => {
    this.props.router.push('/addmember');
  }

  myTicket = (dispatch, router) => {
    this.props.router.push('/mylistticket');
  }

  render() {
    const { typeMember, name, lastName } = this.props.user;
    let imgUrl = 'images/bg.jpg';
    let fullName = name + ' ' + lastName;
    var background = {
        width: '100%',
        height: '100%',
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundSize: 'cover',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1
      };
    var center = {
      width: '50%',
      marginRight: '25%',
      marginLeft: '25%',
      fontSize: 19,
      fontWeight: 'bold',
      marginTop: '2%'
    }
    var centerButton = {
      width: '50%',
      margin: '0 auto',
      marginTop: '2%'
    }
    let img = 'images/b6.png';
    const style = {
      width: '30%',
      height: 70,
      float: 'left',
      margin: '1.5%',
      backgroundImage: 'url(' + img + ')',
      backgroundSize: 'cover',
    }
    const button = {
      marginTop: 15,
      marginBottom: 15,
      color: '#ffffff'
    }
    if (typeMember == 'Gestor') {
      return (
        <div style={background}>
          <BarUser name={fullName} member={typeMember} router={this.props.router} dispatch={this.props.onLogin}/>
          <CardOption router={this.props.router} path='/addmember' title='Agregar Empleado'/>
          <CardOption router={this.props.router} path='/listmember' title='Lista de Empleados'/>
          <CardOption router={this.props.router} path='/listgestor' title='Lista de Gestores'/>
          <CardOption router={this.props.router} path='/addticket' title='Agregar Ticket'/>
          <CardOption router={this.props.router} path='/listticket' title='Lista de Tickets'/>
          <CardOption router={this.props.router} path='/addproduct' title='Agregar Producto'/>
          <CardOption router={this.props.router} path='/listproduct' title='Productos'/>
          <CardOption router={this.props.router} path='/addinventory' title='Agregar Inventario'/>
          <CardOption router={this.props.router} path='/listinventory' title='Inventarios'/>
          <CardOption router={this.props.router} path='/addincidence' title='Agregar Incidencias'/>
          <CardOption router={this.props.router} path='/listincidence' title='Incidencias'/>
          <CardOption router={this.props.router} path='/addsede' title='Agregar Sede'/>
          <CardOption router={this.props.router} path='/listsede' title='Lista de Sedes'/>
          <CardOption router={this.props.router} path='/addnewdepartament' title='Agregar Departamento'/>
          <CardOption router={this.props.router} path='/listdepartament' title='Lista de Departamentos'/>
          <CardOption router={this.props.router} path='/addprovider' title='Agregar Proveedor'/>
          <CardOption router={this.props.router} path='/listprovider' title='Lista de Proveedores'/>
          <Card style={style}>
            <FlatButton label='Imprimir Reporte' fullWidth={true} onClick={() => this.pdf()} style={button}/>
          </Card>
        </div>
      );
    }else {
      return (
        <div style={background}>
          <BarUser name={fullName} member={typeMember} router={this.props.router} dispatch={this.props.onLogin}/>
          <Ticket id={this.props.user.id} create={true}/>
          <RaisedButton label="Ver mis tickets" onClick={() => this.myTicket()} style={center} primary={true}/>
        </div>
      );
    }
  }
}
