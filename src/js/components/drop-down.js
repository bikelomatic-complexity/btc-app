/*eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from 'react';
import { SelectField, MenuItem } from 'material-ui';
/*eslint-enable no-unused-vars*/

const noOps = text => text; // do nothing

export class DropDown extends Component {

  constructor( props ) {
    super( props );
    this.state = { value: null };
  }

  getSelected() {
    return this.state.value;
  }

  setSelected( value ) {
    this.setState( { value } );
  }

  handleChange( event, index, value ) {
    this.setState( { value } );
    this.props.onSelectFunction( value );
  }

  render() {
    const {options, textTransform, text, value} = this.props;
    const optionItems = options.map( ( option, index ) => {
      return (
        <MenuItem key={ option }
          primaryText={ textTransform( option ) }
          value={ option } />
        );
    } );
    return (
      <SelectField fullWidth
        floatingLabelText={ text }
        value={ value || this.state.value }
        onChange={ this.handleChange.bind( this ) }>
        { optionItems }
      </SelectField>
      );
  }
}

DropDown.defaultProps = {
  onSelectFunction: noOps,
  textTransform: noOps,
  text: 'select'
};
export default DropDown;
