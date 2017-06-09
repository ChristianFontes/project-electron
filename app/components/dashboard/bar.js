import React, { Component } from 'react';
import {AppBar} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import IconBack from 'material-ui/svg-icons/navigation/arrow-back';

export default class Bar extends Component {
  render() {
    const { goBack } = this.props;
    return (
      <AppBar
        style={{backgroundColor: 'transparent'}}
        title='Atras'
        iconElementLeft={<IconButton onClick={()=> goBack()}><IconBack/></IconButton>}
      />
    );
  }
}
