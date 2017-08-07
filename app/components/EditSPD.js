import React, { Component, PropTypes } from 'react';
import Bar from './dashboard/bar';
import EditSPD from './dashboard/editSPD';

export default class LoggedIn extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  render() {
    const { name, typeMember } = this.props.user;
    console.log(this.props.router);
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
          <EditSPD data={this.props.user.dataToUpdate} goBack={this.props.router.goBack}/>
        </div>
      );
    }
    return null
  }
}
