/*eslint-disable no-unused-vars*/
import React from 'react';
import { TextField, RaisedButton, FlatButton, SelectField, MenuItem } from 'material-ui';
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
    const [lat, lng] = this.state.location;
    const latlng = `(${ lat.toFixed( 4 ) }, ${ lng.toFixed( 4 ) })`;

    const {types} = this.props;
    const options = toPairs( types ).map( ( [type, values] ) => (
      <MenuItem key={ type }
        value={ type }
        primaryText={ values.display } />
    ) );

    const {coverUrl} = this.state;
    let image;
    if ( coverUrl ) {
      image = (
        <div>
          <image style={ { width: '100%' } }
            src={ coverUrl } />
        </div>
      );
    }

    let {validationErrors} = this.props;
    if ( !validationErrors ) {
      validationErrors = {};
    }

    return (
      <div className="wizard-page">
        <TextField fullWidth
          { ...this.link( 'name' ) }
          floatingLabelText="Name"
          errorText={ validationErrors[ 'name' ] ? validationErrors[ 'name' ].message : '' } />
        <TextField disabled
          fullWidth
          value={ latlng }
          floatingLabelText="Location"
          errorText={ validationErrors[ 'name' ] ? validationErrors[ 'name' ].message : '' } />
        <SelectField fullWidth
          { ...this.link( 'type' ) }
          menuStyle={ { maxWidth: 500 } }
          floatingLabelText="Alert type"
          errorText={ validationErrors[ 'type' ] ? validationErrors[ 'type' ].message : '' }>
          { options }
        </SelectField>
        <TextField fullWidth
          { ...this.link( 'description' ) }
          floatingLabelText="Description"
          multiLine
          rows={ 2 }
          rowsMax={ 4 }
          errorText={ validationErrors[ 'description' ] ? validationErrors[ 'description' ].message : '' } />
        { image }
      </div>
      );
  }

  getPageSecondaryActions() {
    return (
      <FlatButton onClick={ this.onPhotoAdd }
        label="Upload Photo" />
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
