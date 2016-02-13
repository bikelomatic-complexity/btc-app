import React, {Component, PropTypes} from 'react';
import { Icon } from 'react-mdl';
import { SelectField, MenuItem } from 'material-ui';

const noOps = function(text){return text}; // do nothing

export class DropDown extends Component {

  constructor(props) {
    super(props);
    this.state = {value:null}
  }

  handleChange(event, index, value){
    this.setState({value})
    this.props.onSelectFunction(value);
  }

  render() {
    const { options, onSelectFunction, textTransform, text, value } = this.props;
    const optionItems = options.map((option, index)=> {
      return (
        <MenuItem key={option} primaryText={textTransform(option)} value={option}/>
      );
    });
    return (
      <SelectField  floatingLabelText={text}
                    value={value || this.state.value}
                    onChange={this.handleChange.bind(this)}>
        { optionItems }
      </SelectField>
    )
  }
}

DropDown.defaultProps = { textTransform: noOps, text: 'select' };
export default DropDown;
