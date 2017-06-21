import React, { Component, PropTypes } from 'react';
import Bar from './dashboard/bar';
import Products from './dashboard/products';

export default class ListProduct extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  render() {
    const { typeMember } = this.props.user;
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
    return (
      <div style={background}>
        <Bar goBack={this.props.router.goBack}/>
        <Products dispatch={this.props.onLogin} router={this.props.router} />
      </div>
    );
  }
}
