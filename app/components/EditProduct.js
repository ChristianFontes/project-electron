import React, { Component, PropTypes } from 'react';
import {Card, AppBar} from 'material-ui';
import Bar from './dashboard/bar';
import EditProduct from './dashboard/editProduct';

export default class LoggedIn extends Component {
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
    const styleForm = {
      width: '60%',
      marginLeft: '20%',
      marginRigth: '20%'
    }
    if (typeMember == 'Gestor') {
      return (
        <div style={background}>
          <Bar goBack={this.props.router.goBack}/>
          <div style={styleForm}>
            <AppBar style={{backgroundColor: 'transparent', border: 'none'}}
              title='Editar Producto'
              showMenuIconButton={false}
            />
            <Card>
              <EditProduct product={this.props.user.productToUpdate} goBack={this.props.router.goBack}/>
            </Card>
          </div>
        </div>
      );
    }
    return null
  }
}
