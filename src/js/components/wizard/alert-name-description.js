/*eslint-disable no-unused-vars*/
import React from 'react';
import { TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';
/*eslint-enable no-unused-vars*/

import WizardPage from './wizard-page';

import { toPairs } from 'lodash';

export class AlertNameDescription extends WizardPage {
  componentWillMount() {
    const {point} = this.props;

    this.setState( {
      name: point.name,
      type: point.type,
      location: point.location,
      description: point.description,
      coverUrl: point.coverUrl
    } );
  }

  componentDidMount() {
    this.props.setDrawer( 'Enter Information' ) ;
  }

  getPageFields() {
    return [ 'name', 'type', 'description', 'coverBlob' ];
  }

  getPageContent() {
    const [ lat, lng ] = this.state.location;
    const latlng = `(${ lat.toFixed( 4 ) }, ${ lng.toFixed( 4 ) })`;

    const {types} = this.props;
    const options = toPairs( types ).map( ( [type, values] ) => (
      <MenuItem key={ type }
        value={ type }
        primaryText={ values.display } />
    ) );

    const {coverUrl} = this.state;
    let image;
    if( coverUrl ) {
      image = (
        <div>
          <image style={ { width: '100%' } }
            src={ coverUrl } />
        </div>
      );
    }

    return (
      <div className="wizard-page">
        <TextField fullWidth
          { ...this.link( 'name' ) }
          floatingLabelText="Name" />
        <TextField disabled
          fullWidth
          value={ latlng }
          floatingLabelText="Location" />
        <SelectField fullWidth
          { ...this.link( 'type' ) }
          floatingLabelText="Alert type">
          { options }
        </SelectField>
        <TextField fullWidth
          { ...this.link( 'description' ) }
          floatingLabelText="Description"
          multiLine
          rows={ 2 }
          rowsMax={ 4 } />
        <div className="wizard-page__spacer" />
        { image }
        <RaisedButton fullWidth
          secondary
          onClick={ this.onPhotoAdd }
          label="Upload Photo" />
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

export default AlertNameDescription;
