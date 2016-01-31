import React, {Component, PropTypes} from 'react';
import { MenuItem } from 'react-mdl';

const noOps = function(text){return text}; // do nothing

export class DropDown extends Component {

  render() {
    const { elements, func, textTransform } = this.props;
    const options = elements.map((element)=> {
      return (
        <MenuItem onClick={()=>{func(element)}} key={element}>
          {textTransform(element)}
        </MenuItem>
      );
    })
    return (
      <div className="ac-drop-down">
        { options }
      </div>
    )
  }
}

DropDown.deafultProps = { textTransform: noOps };
export default DropDown;
