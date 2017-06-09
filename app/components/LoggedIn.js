import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import CardOption from './dashboard/cardOption';
import BarUser from './dashboard/barUser';
import Ticket from './dashboard/ticket';
import MyListTicket from './dashboard/myListTicket';

export default class LoggedIn extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  goToRouter = () => {
    this.props.router.push('/addmember');
  }

  render() {
    const { typeMember, name, lastName } = this.props.user;
    console.log(this.props);
    let imgUrl = '../app/images/bg.jpg';
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
    if (typeMember == 'Gestor') {
      return (
        <div style={background}>
          <BarUser name={fullName} />
          <CardOption router={this.props.router} path='/addmember' title='Agregar Empleado'/>
          <CardOption router={this.props.router} path='/listmember' title='Lista de Empleados'/>
          <CardOption router={this.props.router} path='/addticket' title='Agregar Ticket'/>
          <CardOption router={this.props.router} path='/listticket' title='Lista de Tickets'/>
          <CardOption router={this.props.router} path='/addmember' title='Inventario'/>
          <CardOption router={this.props.router} path='/addmember' title='Incidencias'/>
          <CardOption router={this.props.router} path='/addmember' title='Sedes'/>
          <CardOption router={this.props.router} path='/listmember' title='Departamentos'/>
        </div>
      );
    }else {
      return (
        <div style={background}>
          <BarUser name={fullName} />
          <Ticket id={this.props.user.id} create={true}/>
          <MyListTicket id={this.props.user.id}/>
        </div>
      );
    }
  }
}
