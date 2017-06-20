import React, { Component, PropTypes } from 'react';
import { Card, AppBar } from 'material-ui';
import Bar from './dashboard/bar';
import Product from './dashboard/product';

export default class LoggedIn extends Component {
  render() {
    const { name, id } = this.props.user;
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
    const styleForm = {
      width: '60%',
      marginLeft: '20%',
      marginRigth: '20%'
    }
    return (
      <div style={background}>
        <Bar name={name} goBack={this.props.router.goBack}/>
        <div style={styleForm}>
          <AppBar style={{backgroundColor: 'transparent', border: 'none'}}
            title='Agregar un nuevo Producto'
            showMenuIconButton={false}
          />
          <Card>
            <Product id={id} />
          </Card>
        </div>
      </div>
    );
  }
}
