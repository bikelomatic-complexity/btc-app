/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { FontIcon } from 'material-ui';
/*eslint-enable no-unused-vars*/

export class RatingSelector extends Component {
  onSetRating( starIndex ) {
    const {setRating} = this.props;
    if ( !this.props.disabled ) {
      setRating( starIndex );
    }
  }

  render() {
    const stars = [ 1, 2, 3, 4, 5 ].map( star => {
      let icon = 'star_border';
      if ( this.props.rating >= star ) {
        icon = 'star';
      } else if ( ( this.props.rating - star ) === 0.5 ) {
        icon = 'star_half';
      }
      return (<FontIcon style={ this.props.style }
                key={ star }
                className='material-icons'
                onClick={ ( ) => this.onSetRating( star ) }>
                { icon }
              </FontIcon>);
    } );

    let clearIcon;
    if ( !this.props.disabled && this.props.rating != 0 ) {
      clearIcon = (<FontIcon className='material-icons'
                     style={ this.props.style }
                     onClick={ ( ) => this.onSetRating( 0 ) }>
                     clear
                   </FontIcon>);
    }

    return (<span>
              { stars }
              { clearIcon }
            </span>);
  }
}

export default RatingSelector;
