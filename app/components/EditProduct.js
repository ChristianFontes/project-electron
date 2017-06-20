import React, { Component, PropTypes } from 'react';
import Bar from './dashboard/bar';
import EditProduct from './dashboard/editProduct';

export default class LoggedIn extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  render() {
    const { name, typeMember } = this.props.user;
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
          <EditProduct product={this.props.user.productToUpdate} goBack={this.props.router.goBack}/>
        </div>
      );
    }
    return null
  }
}
