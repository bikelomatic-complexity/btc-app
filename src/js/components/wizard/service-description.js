/*eslint-disable no-unused-vars*/
import React from 'react';
import { RaisedButton, TextField } from 'material-ui';
/*eslint-enable no-unused-vars*/

import { bindAll, isEmpty } from 'lodash';
import WizardPage from './wizard-page';

export class ServiceDescription extends WizardPage {
  constructor( props ) {
    super( props );
    bindAll( this, 'onPhotoAdd' );

    const {newPoint} = props;
    this.state = {
      description: newPoint.description || '',
      phoneNumber: newPoint.phoneNumber || '',
      address: newPoint.address || '',
      website: newPoint.website || ''
    };
  }

  componentDidMount( nextProps ) {
    const {setDrawer, newPoint} = nextProps;
    setDrawer( newPoint._id ? 'Update Details' : 'Add Details' );
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
    return [ 'description', 'phoneNumber', 'address', 'website' ];
  }

  getPageContent() {
    const {imageSrc} = this.props.newPoint;
    const image = isEmpty( imageSrc ) ? <div /> : <img src={ imageSrc } />;

    return (
      <div className="wizard-page">
        <TextField fullWidth
          { ...this.link( 'phoneNumber' ) }
          floatingLabelText="Phone Number"
          type="tel" />
        <TextField fullWidth
          { ...this.link( 'address' ) }
          floatingLabelText="Address" />
        <TextField fullWidth
          { ...this.link( 'website' ) }
          floatingLabelText="Website"
          type="url" />
        <TextField fullWidth
          { ...this.link( 'description' ) }
          floatingLabelText="Description"
          multiLine={ true }
          rows={ 2 }
          rowsMax={ 4 } />
        { image }
        <div className="wizard-page__spacer" />
        <RaisedButton fullWidth
          secondary
          onClick={ this.onPhotoAdd }
          label="Upload Photo" />
      </div>
      );
  }

  getPreferredTransition() {
    const anySet = this.getPageFields().reduce( ( anySet, field ) => {
      return anySet || !isEmpty( this.state[ field ] );
    }, false );

    if ( anySet ) {
      return WizardPage.transitions.next;
    } else {
      return WizardPage.transitions.skip;
    }
  }
}

export default ServiceDescription;
