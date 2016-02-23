import React, {Component} from 'react';
import { FontIcon } from 'material-ui';

export class RatingSelector extends Component {
  render() {
    const stars = [0,1,2,3,4].map( star => {
        let icon = "star_border";
        if ((this.props.rating - star) >= 1) {
          icon = "star";
        } else if ((this.props.rating - star) === 0.5) {
          icon = "star_half";
        }
        return icon;
    });

    const starIcons = stars.map( (star, i) => {
      return (<FontIcon key={i} className="material-icons">{star}</FontIcon>);
    });

    return (<span>{starIcons}</span>);
  }
}

export default RatingSelector;
