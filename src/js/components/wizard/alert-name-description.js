/*eslint-disable no-unused-vars*/
import React from 'react';

import { TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';
/*eslint-enable no-unused-vars*/

import { toPairs, bindAll, isEmpty, isUndefined, pick } from 'lodash';
import WizardPage from './wizard-page';

export class AlertNameDescription extends WizardPage {
  constructor( props ) {
    super( props );

    const {newPoint} = props;
    this.state = {
      name: newPoint.name || '',
      type: newPoint.type || '',
      description: newPoint.description || ''
    };
  }

  componentDidMount() {
    const {setDrawer} = this.props;
    setDrawer( 'Enter Information' ) ;
  }

  // This logic will not work on the browser:
  // [CB-9852](https://issues.apache.org/jira/browse/CB-9852)
  onPhotoAdd() {
    navigator.camera.getPicture(
      imageSrc => this.props.setPointImage( imageSrc ),
      err => console.error( err ),
      {
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        encodingType: navigator.camera.EncodingType.PNG
      }
    );
  }

  getPageFields() {
    return [ 'name', 'location', 'type' ];
  }

  getPageContent() {
    let latLngString = '';
    if ( this.props.newPoint.location.length !== 0 ) {
      const [lat, lng] = this.props.newPoint.location;
      latLngString = `(${lat.toFixed( 4 )}, ${lng.toFixed( 4 )})`;
    }

    const {types} = this.props;
    const options = toPairs( types ).map( ( [type, values] ) => (
      <MenuItem key={ type }
        value={ type }
        primaryText={ values.display } />
    ) );

    const {imageSrc} = this.props.newPoint;
    const image = isEmpty( imageSrc ) ? <div /> : <img src={ imageSrc } />;

    return (
      <div className="wizard-page">
        <TextField fullWidth
          { ...this.link( 'name' ) }
          floatingLabelText="Name" />
        <TextField disabled
          fullWidth
          value={ latLngString }
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
