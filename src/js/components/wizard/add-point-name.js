/*eslint-disable no-unused-vars*/
import React from 'react';

import { TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';
/*eslint-enable no-unused-vars*/

import WizardPage from './wizard-page';
import { types, displayType } from '../../types';

export class AddPointName extends WizardPage {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.newPoint.name || '',
      type: this.props.newPoint.type || ''
    };
  }

  componentDidMount() {
    const {setDrawer} = this.props;
    setDrawer( 'Enter Information' ) ;
  }

  onNameUpdate( event ) {
    const {setPointName} = this.props;
    const name = event.target.value;
    setPointName( name );
  }

  onTypeSelect( type ) {
    const {setPointType} = this.props;
    setPointType( type );
  }

  getPageFields() {
    return ['name', 'location', 'type'];
  }

  getPageContent() {
    let latLngString = '';
    if ( this.props.newPoint.location.length !== 0 ) {
      const [lat, lng] = this.props.newPoint.location;
      latLngString = `(${lat.toFixed( 4 )}, ${lng.toFixed( 4 )})`;
    }

    const { name, type } = this.props.newPoint;

    const options = types.map( type => (
      <MenuItem key={ type }
        value={ type } primaryText={ displayType( type ) } />
    ) );

    return (
      <form className="wizard-page">
        <TextField { ...this.link( 'name' ) }
          hintText="Name"
          floatingLabelText="Name"
          defaultValue={ name } />
        <TextField disabled
          value={ latLngString }
          hintText="Location"
          floatingLabelText="Location" />
        <SelectField { ...this.link( 'type' ) }
          floatingLabelText="Service type">
          { options }
        </SelectField>
      </form>
      );
  }

  getTransition() {
    const { name, type } = this.state;

    if( name && type ) {
      return WizardPage.transitions.next;
    } else {
      return WizardPage.transitions.disabled;
    }
  }
}

export default AddPointName;
