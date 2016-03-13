/*eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, FontIcon } from 'material-ui';
/*eslint-enable no-unused-vars*/

// MapButtons takes in props for buttons, in which buttons should be an array of
// button objects, like so:
/*
  [{onClick: goToFilter, icon:'filter'}, {onClick: goToList, icon:'list'}]
*/
export class MapButtons extends Component {
  render() {
    const buttons = this.props.buttons.map((button, index) => {
      return (
        <FloatingActionButton mini={true} style={{position:'fixed', top: `${82 + 55 * index}px`, right: '10px'}}>
          <FontIcon onClick={()=>{this.props.history.push(button.page);}} className="material-icons">{button.icon}</FontIcon>
        </FloatingActionButton>
      );
    });
    return (
      <span> {buttons} </span>
    );
  }
}

export default MapButtons;
