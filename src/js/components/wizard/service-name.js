/*eslint-disable no-unused-vars*/
import React from 'react';

import { TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';
/*eslint-enable no-unused-vars*/

import { toPairs } from 'lodash';
import WizardPage from './wizard-page';

export class ServiceName extends WizardPage {
  componentWillMount() {
    const {point} = this.props;
    this.setState( {
      name: point.name,
      type: point.type,
      location: point.location
    } );
  }

  componentDidMount() {
    this.props.setDrawer( 'Enter Information' ) ;
  }

  getPageFields() {
    return [ 'name', 'location', 'type' ];
  }

  getPageContent() {
    const [lat, lng] = this.state.location;
    const latlng = `(${ lat.toFixed( 4 ) }, ${ lng.toFixed( 4 ) })`;

    const {types} = this.props;
    const options = toPairs( types ).map( ( [type, values] ) => (
      <MenuItem key={ type }
        value={ type }
        primaryText={ values.display } />
    ) );

    const {validationErrors} = this.props;

    return (
      <div className="wizard-page">
        <TextField fullWidth
          { ...this.link( 'name' ) }
          floatingLabelText="Name"
          errorText={validationErrors['name'] ? validationErrors['name'].message : ''} />
        <TextField disabled
          fullWidth
          value={ latlng }
          floatingLabelText="Location"
          errorText={validationErrors['location'] ? validationErrors['location'].message : ''} />
        <SelectField fullWidth
          { ...this.link( 'type' ) }
          menuStyle={ { maxWidth: 500 } }
          floatingLabelText="Service type"
          errorText={validationErrors['type'] ? validationErrors['type'].message : ''} >
          { options }
        </SelectField>
      </div>
      );
  }

  getPreferredTransition() {
    const {name, type} = this.state;

    if ( name && type ) {
      return WizardPage.transitions.next;
    } else {
      return WizardPage.transitions.disabled;
    }
  }
}

export default ServiceName;
