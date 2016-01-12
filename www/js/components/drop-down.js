import React, {Component, PropTypes} from 'react';
import { MenuItem } from 'react-mdl';

export class DropDown extends Component {

  render() {
    const { elements, func } = this.props;
    const options = elements.map((element)=> {
      return <MenuItem onClick={()=>{func(element)}} key={element}>{element}</MenuItem>;
    })
    return (
      <div className="ac-drop-down">
        { options }
      </div>
    )
  }
}

export default DropDown;
