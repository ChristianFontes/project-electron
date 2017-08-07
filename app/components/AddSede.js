import React, { Component, PropTypes } from 'react';
import Bar from './dashboard/bar';
import AddSede from './dashboard/addSede';

export default class AddSedeClass extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  render() {
    const { name, typeMember } = this.props.user;
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
          <Bar name={name} goBack={this.props.router.goBack}/>
          <AddSede id={this.props.user.id} create={true}/>
        </div>
      );
    }
    return null
  }
}
