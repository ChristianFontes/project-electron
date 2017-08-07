import React, { Component } from 'react';
import { sede } from '../../api/constants';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  CardActions,
  FlatButton,
  AppBar,
  RaisedButton
} from 'material-ui';

export default class ListMember extends Component {
  constructor(props) {
   super(props);
   this.state = {
     arrayMembers: [],
     selectedRow: {},
     height: '400px'
   };
  }

  componentWillMount() {
    this.getListUser();
  }

  getListUser = () => {
    const { token } = this.props;

    let that = this;
    fetch(sede, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then(function(data) {
      let arrayFilter = [];
      that.setState({arrayMembers: data});
    })
    .catch(function(err) {
        // This is where you run code if the server returns any errors
        console.log(err);
    });
  }

  rowSelection = (rows) => {
    let id = rows[0];
    let that = this;
    if (id != undefined) {
      setTimeout(function() {
        that.setState({
          selection: that.state.arrayMembers[id],
          height: '300px',
          delete: false
        });
      }, 500);
    }
  }

  delete = (obj) => {
    this.setState({
      delete: true,
      id: obj.id
    });
  }

  updateUser = (obj) => {
    const { dispatch, router } = this.props;
    obj["update"] = 'sede';
    let dataToUpdate = {
      dataToUpdate: obj
    };
    dispatch(dataToUpdate);
    router.push('/editSPD');
  }

  confirmation = (value) => {
    if (value) {
      let id = '/' + this.state.id;
      let url = sede + id;
      fetch(url, {
        method: 'DELETE'
      }).then(res => res.json())
        .then(res => {
          this.setState({
            selection: null,
            delete: false,
            id: null
          });
          this.getListUser();
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

      let deleteUser = 'Si deseo eliminar a '+ this.state.selection.name + '?';

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
      let titleEdit = 'Editar Sede ' + this.state.selection.name;
      let titleDelete = 'Eliminar a ' + this.state.selection.name;
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
          <RaisedButton label={titleEdit} onClick={() => this.updateUser(this.state.selection)} style={styleButton} primary={true} fullWidth={true} />
          <RaisedButton label={titleDelete} onClick={() => this.delete(this.state.selection)} secondary={true} fullWidth={true} />
          { this.renderConfirmation() }
        </CardActions>
      );
    }
    return null;
  }

  checkIfExist(data, type) {
    if (data !== undefined) {
      if (type == 'name') {
        return data.name;
      }
    }else{
      return null;
    }
  }

  render() {
    const { arrayMembers } = this.state;
    const styleTable = {
      width: '80%',
      marginLeft: '10%',
      marginRigth: '10%',
      paddingBottom: 30,
    }

    return(
      <div style={styleTable}>
        <AppBar style={{backgroundColor: 'transparent', border: 'none'}}
          title="Lista de Sedes"
          showMenuIconButton={false}
        />
        <Table onRowSelection={this.rowSelection} height={this.state.height}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Nombre</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              arrayMembers.map( (row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{arrayMembers[index].name}</TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        { this.renderButtones() }
      </div>
    );
  }
}
