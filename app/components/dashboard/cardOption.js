import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardText, FlatButton} from 'material-ui';

export default class CardOption extends Component {
  goToRouter = (router, path) => {
    router.push(path);
  }

  render() {
    let imgUrl = 'images/b6.png';
    const { router, path, title } = this.props
    const style = {
      width: '30%',
      height: 70,
      float: 'left',
      margin: '1%',
      marginLeft: '2%',
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover',
    }
    const button = {
      marginTop: 15,
      marginBottom: 15,
      color: '#ffffff'
    }
    return(
      <Card style={style} onClick={() => this.goToRouter(router, path)}>
        <FlatButton label={title} fullWidth={true} onClick={() => this.goToRouter(router, path)} style={button}/>
      </Card>
    );
  }
}
