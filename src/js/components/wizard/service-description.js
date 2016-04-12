/*eslint-disable no-unused-vars*/
import React from 'react';
import { RaisedButton, FlatButton, TextField } from 'material-ui';
/*eslint-enable no-unused-vars*/

import { isEmpty } from 'lodash';
import WizardPage from './wizard-page';

export class ServiceDescription extends WizardPage {
  componentWillMount() {
    const {point} = this.props;
    this.setState( {
      description: point.description,
      phone: point.phone,
      address: point.address,
      website: point.website,
      coverUrl: point.coverUrl
    } );
  }

  componentDidMount() {
    this.props.setDrawer( 'Add Details' );
  }

  getPageFields() {
    return [
      'description',
      'phone',
      'address',
      'website',
      'coverBlob',
      'coverUrl'
    ];
  }

  getPageContent() {
    const {coverUrl} = this.state;
    let {validationErrors} = this.props;
    if (validationErrors == undefined) {
      validationErrors = {};
    }

    let image;
    if ( coverUrl ) {
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
          { ...this.link( 'phone' ) }
          floatingLabelText="Phone Number"
          errorText={validationErrors['.phone'] ? validationErrors['.phone'].message : ""}
          type="tel" />
        <TextField fullWidth
          { ...this.link( 'address' ) }
          floatingLabelText="Address" 
          errorText={validationErrors['.address'] ? validationErrors['.address'].message : ""} />
        <TextField fullWidth
          { ...this.link( 'website' ) }
          floatingLabelText="Website"
          errorText={validationErrors['.website'] ? validationErrors['.website'].message : ""}
          type="url" />
        <TextField fullWidth
          { ...this.link( 'description' ) }
          floatingLabelText="Description"
          errorText={validationErrors['.description'] ? validationErrors['.description'].message : ""}
          multiLine={ true }
          rows={ 2 }
          rowsMax={ 4 } />
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
