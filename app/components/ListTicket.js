import React, { Component, PropTypes } from 'react';
import Bar from './dashboard/bar';
import List from './dashboard/list';
import { ticket } from '../api/constants';

export default class ListMember extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  constructor(props) {
   super(props);
   this.state = {
     data: null
   };
  }

  componentWillMount() {
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

  render() {
    const { typeMember } = this.props.user;
    let imgUrl = '../app/images/bg.jpg';
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
          <Bar goBack={this.props.router.goBack}/>
          <List data={this.state.data}/>
        </div>
      );
    }
    return null
  }
}
