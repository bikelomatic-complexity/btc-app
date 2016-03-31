/*eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
import { List, ListItem, IconButton, FontIcon, Divider, Avatar } from 'material-ui';
/*eslint-enable no-unused-vars*/

import { display } from 'btc-models/lib/schema/types';

export class PointList extends Component {
  render() {
    const points = this.props.points.map( point => {
      const listProps = {};
      if ( this.props.buttonIcon && this.props.buttonAction ) {
        listProps.rightIconButton = (
          <IconButton onClick={ this.props.buttonAction.bind( this, point ) }>
            <FontIcon className="material-icons"
              style={ { fontSize: '36px' } }
              color="red">
              { this.props.buttonIcon }
            </FontIcon>
          </IconButton>
        );
      }

      if ( point.coverUrl ) {
        listProps.leftAvatar = <Avatar src={ point.coverUrl } />;
      }

      return (
        <div key={ point._id }>
          <ListItem style={ { margin: '10px' } }
            onTouchTap={ this.props.clickAction.bind( this, point ) }
            primaryText={ point.name }
            secondaryText={ display( point.type ) }
            { ...listProps } />
          <Divider/>
        </div>
        );
    } );

    return (
      <div>
        { this.props.instructions }
        <List>
          { points }
        </List>
      </div>
      );
  }
}

export default PointList;
