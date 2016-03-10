/*eslint-disable no-unused-vars*/
import React from 'react';
import { RaisedButton, TextField } from 'material-ui';
/*eslint-enable no-unused-vars*/

import { bindAll, isEmpty, isUndefined, pick } from 'lodash';
import WizardPage from './wizard-page';

export class AddPointDescription extends WizardPage {
  constructor(props) {
    super(props);
    bindAll( this, 'onPhotoAdd' );
  }

  getInitState() {
    const { newPoint } = this.props;

    return {
      description: newPoint.description || '',
      phoneNumber: newPoint.phoneNumber || '',
      address: newPoint.address || '',
      website: newPoint.website || ''
    };
  }

  componentWillReceiveProps( nextProps ) {
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
    return ['description', 'phoneNumber', 'address', 'website'];
  }

  // If we are loading an update point, don't render the page until we have the
  // correct data. The `defaultValue` cannot be overwritten after the initial
  // render.
  //
  // TODO: what does each subexpression mean?
  notReady() {
    const { newPoint, params } = this.props;
    return ( isUndefined( newPoint._id ) && !isUndefined( params.pointId ) )
        || ( newPoint._id !== params.pointId );
  }

  render() {
    const { imageSrc } = this.props.newPoint;
    const image = isEmpty(imageSrc) ? <div /> : <img src={ imageSrc } />;

    if( this.notReady() ) {
      return <div/>;
    } else {
      return (
        <div className="wizard-page">
          <TextField { ...this.link( 'description' ) }
            floatingLabelText="Description"
            hintText="Description"
            defaultValue={ this.init.description }
            multiLine={ true }
            rows={ 2 }
            rowsMax={ 4 } />
          <TextField { ...this.link( 'phoneNumber' ) }
            floatingLabelText="Phone Number"
            hintText="Phone Number"
            defaultValue={ this.init.phoneNumber }
            type="tel" />
          <TextField { ...this.link( 'address' ) }
            floatingLabelText="Address"
            hintText="Address"
            defaultValue={ this.init.address } />
          <TextField { ...this.link( 'website' ) }
            floatingLabelText="Website"
            defaultValue={ this.init.website }
            type="url" />
          { image }
          <RaisedButton secondary
            onClick={ this.onPhotoAdd }
            label="Upload Photo" />
        </div>
        );
    }
  }

  getTransition() {
    const anySet = this.getFields().reduce( ( anySet, field ) => {
      return anySet || !isEmpty( this.state[ field ] );
    }, false );

    if( anySet ) {
      return WizardPage.transitions.next;
    } else {
      return WizardPage.transitions.skip;
    }
  }
}

export default AddPointDescription;
