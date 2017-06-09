import React, { Component } from 'react';
import { register, ticket } from '../../api/constants';
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

var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

var io = sailsIOClient(socketIOClient);

// Set some options:
// (you have to specify the host and port of the Sails backend when using this library from Node.js)
io.sails.url = 'http://localhost:1337';

export default class ListMember extends Component {
  constructor(props) {
   super(props);
   this.state = {
     data: null,
     selectedRow: {},
     height: '200px'
   };
  }

  componentWillMount = () => {
    const { id } = this.props;
    let that = this;
    let url = register + '/' + id + '/tickets';
    fetch(url, {
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

  componentDidMount() {
    const { id } = this.props;
    let url = register + '/' + id + '/tickets';
    io.socket.on('connect', function() {
      io.socket.on('new ticket', function(obj) {
        io.socket.get(url, function(data) {
          this.setState({data});
        }.bind(this));
      }.bind(this));

    }.bind(this));
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
    console.log(row);
    if (id != undefined) {
      setTimeout(function() {
        that.setState({
          selection: that.state.data[id],
          height: '150px',
          delete: false
        });
      }, 500);
    }
  }

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
      console.log(obj);
      let createdBy = 'Ticket creado el: ' + this.formatDate(obj.createdAt);
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
              <FlatButton label="Cerrar Ticket" onClick={() => this.setState({
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
        title="Mis Tickets"
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
              <TableHeaderColumn>Fecha</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map( (row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{data[index].title}</TableRowColumn>
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
