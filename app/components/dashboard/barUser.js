import React, { Component } from 'react';
import {AppBar} from 'material-ui';

export default class Bar extends Component {
  render() {
    const { name, goBack } = this.props;
    let title = 'Bienvenido ' + name;
    return (
      <AppBar
        style={{backgroundColor: 'transparent'}}
        title={title}
        showMenuIconButton={false}
      />
    );
  }
}
