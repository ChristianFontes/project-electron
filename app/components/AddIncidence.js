import React, { Component, PropTypes } from 'react';
import Bar from './dashboard/bar';
import Incidence from './dashboard/incidence';
import { Card, AppBar } from 'material-ui';

export default class AddInventory extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  render() {
    const { name, typeMember, id } = this.props.user;
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
      width: '50%',
      marginLeft: '25%',
      marginRigth: '25%'
    }
    if (typeMember == 'Gestor') {
      return (
        <div style={background}>
          <Bar name={name} goBack={this.props.router.goBack}/>
          <div style={styleForm}>
            <AppBar style={{backgroundColor: 'transparent', border: 'none'}}
              title='Agregar una nueva Incidencia'
              showMenuIconButton={false}
            />
            <Card>
              <Incidence id={id}/>
            </Card>
          </div>
        </div>
      );
    }
    return null
  }
}
