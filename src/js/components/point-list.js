/*eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
import { List, ListItem, IconButton, FontIcon } from 'material-ui';
/*eslint-enable no-unused-vars*/

import { display } from 'btc-models/lib/schema/types';

export class PointList extends Component {
  render() {
    const points = this.props.points.map( point => {
      let actionButton = <span />;
      if ( this.props.buttonIcon != undefined ) {
        actionButton = (
          <IconButton onClick={ this.props.buttonAction.bind( this, point ) }>
            <FontIcon className="material-icons"
              style={ { fontSize: '36px' } }
              color="red">
              { this.props.buttonIcon }
            </FontIcon>
          </IconButton>
        );
      }

      return (
        <ListItem key={ point._id }
          style={ { margin: '10px' } }
          onTouchTap={ this.props.clickAction.bind( this, point ) }
          leftAvatar={ point.coverUrl }
          primaryText={ point.name }
          secondaryText={ display( point.type ) }
          rightIconButton={ actionButton } />
        );
    } );
    return (
      <List>
        { points }
      </List>
      );
  }
}

export default PointList;
