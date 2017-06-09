import React, { Component } from 'react';
import { ticket } from '../../api/constants';
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
     height: '400px'
   };
  }

  componentWillReceiveProps = (next_props) => {
    const { data } = next_props;
    this.setState({data});
  }

  updateList = () => {
    let that = this;
    fetch(ticket, {
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
          height: '400px',
          delete: false
        });
      }, 500);
    }
  }
  //
  delete = (obj) => {
    this.setState({
      delete: true,
      id: obj.id
    });
  }
  //
  // updateUser = (obj) => {
  //   const { dispatch, router } = this.props;
  //   let userToUpdate = {
  //     userToUpdate: obj
  //   };
  //   dispatch(userToUpdate);
  //   router.push('/editmember');
  // }
  //
  confirmation = (value) => {
    if (value) {
      let id = '/' + this.state.id;
      let url = ticket + id;
      fetch(url, {
        method: 'DELETE'
      }).then(res => res.json())
        .then(res => {
          this.setState({
            selection: null,
            delete: false,
            id: null
          });
          this.updateList();
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
  //
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

      let deleteUser = 'Si deseo eliminar el ticket creado por '+ this.state.selection.user[0].userName + ' ?';

      return (
        <CardActions style={style}>
          <RaisedButton label={deleteUser} onClick={() => this.confirmation(true)} style={styleButton} primary={true} fullWidth={true} />
          <RaisedButton label='No eliminar' onClick={() => this.confirmation(false)} secondary={true} fullWidth={true} />
        </CardActions>
      );
    }
    return (
      <FlatButton label="Eliminar Ticket" onClick={() => this.delete(this.state.selection)} />
    );
  }
  //
  // renderButtones = () => {
  //   if (this.state.selection != null || this.state.selection != undefined) {
  //     let titleEdit = 'Editar al empleado ' + this.state.selection.name + ' ' + this.state.selection.lastName;
  //     let titleDelete = 'Eliminar a ' + this.state.selection.name + ' ' + this.state.selection.lastName;
  //     const style = {
  //       width: '90%',
  //       marginLeft: '5%',
  //       marginRigth: '5%',
  //       alignItems: 'center'
  //     }
  //
  //     const styleButton = {
  //       marginBottom: 10
  //     }
  //
  //     return (
  //       <CardActions style={style}>
  //         <RaisedButton label={titleEdit} onClick={() => this.updateUser(this.state.selection)} style={styleButton} primary={true} fullWidth={true} />
  //         <RaisedButton label={titleDelete} onClick={() => this.delete(this.state.selection)} secondary={true} fullWidth={true} />
  //         { this.renderConfirmation() }
  //       </CardActions>
  //     );
  //   }
  //   return null;
  // }

  renderTicket = () => {
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
      let createdBy = 'Creado por: ' + obj.user[0].userName;
      return(
        <Card style={style}>
          <CardHeader
            title={obj.title}
            subtitle={createdBy}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <div style={content}>
              {obj.content}
            </div>
            <CardActions>
              { this.renderConfirmation() }
            </CardActions>
          </CardText>
        </Card>
      );
    }
    return (
      <AppBar style={{backgroundColor: 'transparent', border: 'none'}}
        title="Lista de Tickets"
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
        { this.renderTicket() }
        <Table onRowSelection={this.rowSelection} height={this.state.height}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Titulo</TableHeaderColumn>
              <TableHeaderColumn>Enviado por</TableHeaderColumn>
              <TableHeaderColumn>Tipo de miembro</TableHeaderColumn>
              <TableHeaderColumn>Fecha</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map( (row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{data[index].title}</TableRowColumn>
                  <TableRowColumn>{data[index].user[0].userName}</TableRowColumn>
                  <TableRowColumn>{data[index].user[0].typeMember}</TableRowColumn>
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
