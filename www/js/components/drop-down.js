import React, {Component, PropTypes} from 'react';
import { MenuItem, Button, Icon } from 'react-mdl';

const noOps = function(text){return text}; // do nothing

export class DropDown extends Component {

  constructor(props){
    super(props);
    this.state = {show:false};
  }

  toggleShowOptions() {
    this.setState({show:!(this.state.show)});
  }

  onSelect(option) {
    this.props.onSelectFunction(option);
    this.toggleShowOptions();
  }

  render() {
    const { options, onSelectFunction, textTransform, text } = this.props;
    const optionItems = options.map((option)=> {
      return (
        <MenuItem onClick={this.onSelect.bind(this, option)} key={option}>
          {textTransform(option)}
        </MenuItem>
      );
    });
    const buttonStyle = {
      display: (this.state.show ? '' : 'none')
    }
    return (
      <div className="form-row">
        <Button raised={this.props.raised} colored={this.props.colored}
                disabled={options.length == 0}
                onClick={this.toggleShowOptions.bind(this)}>
          {text} <Icon name="arrow_drop_down"/>
        </Button>
        <div style={buttonStyle} className="ac-drop-down">
          { optionItems }
        </div>
      </div>
    )
  }
}

DropDown.defaultProps = { textTransform: noOps, text: 'select' };
export default DropDown;
