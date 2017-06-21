import React, { Component } from 'react';
import {AppBar, FlatButton} from 'material-ui';

export default class Bar extends Component {
  exit = (dispatch, router) => {
    let user = null;
    dispatch(user);
    router.replace('/');
  }

  render() {
    const { name, dispatch, router } = this.props;
    console.log(this.props);
    let title = 'Bienvenido ' + name;
    return (
      <AppBar
        style={{backgroundColor: 'transparent'}}
        title={title}
        showMenuIconButton={false}
        iconElementRight={<FlatButton label="Cerrar Sesión" onClick={() => this.exit(dispatch, router)}/>}
      />
    );
  }
}
