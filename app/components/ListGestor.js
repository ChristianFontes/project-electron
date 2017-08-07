import React, { Component, PropTypes } from 'react';
import Bar from './dashboard/bar';
import List from './dashboard/listGestor';

export default class ListMember extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  render() {
    const { typeMember, token } = this.props.user;
    let imgUrl = 'images/bg.jpg';
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
          <List token={token} dispatch={this.props.onLogin} router={this.props.router}/>
        </div>
      );
    }
    return null
  }
}
