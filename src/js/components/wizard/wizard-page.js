/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { keys, pick, assign, isFunction, bindAll, isEmpty } from 'lodash';
import { RaisedButton, FlatButton } from 'material-ui';
/*eslint-enable no-unused-vars*/

import Device, { PHOTO_ENCODING_METHODS } from '../../util/device';
import { imgSrcToBlob, createObjectURL, base64StringToBlob } from 'blob-util';

import '../../../css/wizard.css';

// The WizardPage is the base class for all the pages associated with a tab
// in the add point or update point flows.
//
// Wizard pages operate in succession. Completing one page brings you to the
// next. This transition may depend on the state of the current page. Each
// wizard page is given the ability to choose when it allows the user to
// move on to the next page.
//
// NOTE: **A WizardPage must not be rendered if its required data is not yet
// available.** The link function works off of the defaultValue prop, anything
// else is needlessly complex.
export class WizardPage extends Component {
  constructor( props ) {
    super( props );
    bindAll( this, 'link', 'onPhotoAdd', 'persistBefore' );

    this.state = {};
  }

  // Return an array of field names that will be picked out of `this.state`
  // for serialization.
  getPageFields() {
    return [];
  }

  // Pick the values for fields in `getPageFields()` for serialization;
  getPageValues() {
    return assign( {}, pick( this.state, this.getPageFields() ) );
  }

  // Get the content to display in the wizard page. These should usually be
  // form fields. The content should be controlled, where fields are linked
  // with this.state.
  getPageContent() {
    console.error( 'WizardPage#getPageContent() is abstract' );
    return <div />;
  }

  getPageSecondaryActions() {
    return;
  }

  // Return the preferred transition type, to modify the effect of the "next"
  // button.
  getPreferredTransition() {
    console.error( 'WizardPage#getPageContent() is abstract' );
    return WizardPage.transitions.disabled;
  }

  // Returns a transition type from WizardPage.transitions to modify the
  // effect of the "next" button. This method takes in the wizard page
  // subclass' preference into account. However, we override the preference
  // when the wizard page is the last in the list of tabs, in which case
  // the action should always be submit.
  getTransition() {
    if ( this.props.finalTab ) {
      return WizardPage.transitions.submit;
    } else {
      return this.getPreferredTransition();
    }
  }

  // The action button should be disabled if that transition is selected.
  isDisabled() {
    return this.getTransition() === WizardPage.transitions.disabled;
  }

  persistBefore( callback ) {
    const values = this.getPageValues();
    if ( keys( values ).length > 0 && isFunction( this.props.persist ) ) {
      this.props.persist( values, callback );
    } else {
      callback();
    }
  }

  // Links state and input value. Tuned to work with Material UI.
  //
  // This method returns a props object you can expand on on the react
  // comopnent you want to link. For example:
  // ```
  // <TextField { ...this.link( 'name' ) } />
  // ```
  // By default, we listen to granular field changes. You can change the
  // event we listen to:
  // ```
  // <TextField { ...this.link( 'name', 'onBlur' ) }
  // ```
  link( field, method = 'onChange' ) {
    const props = {};

    // Set the input to the value at the `field` key in state
    props.value = this.state[ field ];

    // Add an event listener that sets state @ `field`. Different material-ui
    // components return the field value differently. It can either be in
    // `value` or `event.target.value`. In the case of TimePicker, a Date
    // object is stored at the second argument.
    props[ method ] = ( event, key, value ) => {
      if ( key instanceof Date ) {
        value = key;
      }
      this.setState( { [ field ]: value || event.target.value } );
    };

    // Set the input's default value at the `field` key in newPoint
    const {newPoint} = this.props;
    if ( newPoint ) {
      props.defaultValue = newPoint[ field ] || '';
    }

    return props;
  }

  render() {
    const {label} = this.getTransition();

    return (
      <div className="tabs-content">
        <div className="tabs-content__form">
          { this.getPageContent() }
        </div>
        <div className="tabs-content__action">
          <div>
            { this.getPageSecondaryActions() }
            <RaisedButton primary
              disabled={ this.isDisabled() }
              onClick={ this.props.onNext }
              label={ label } />
          </div>
        </div>
      </div>
      );
  }

  // This logic will not work on the browser:
  // [CB-9852](https://issues.apache.org/jira/browse/CB-9852)
  onPhotoAdd() {
    navigator.camera.getPicture( photo => {
      let promise;
      const device = Device.getDevice();
      switch ( device.getPhotoEncodingMethod() ) {
      case PHOTO_ENCODING_METHODS.IMG_SRC:
        promise = imgSrcToBlob( photo );
        break;
      case PHOTO_ENCODING_METHODS.BASE_64_STRING:
        promise = base64StringToBlob( photo );
        break;
      case PHOTO_ENCODING_METHODS.NONE:
      default:
        promise = null;
      }
      if ( promise ) promise.then( coverBlob => {
          const coverUrl = createObjectURL( coverBlob );
          this.setState( { coverBlob, coverUrl } );
        } );
    }, err => {
      console.error( err );
    }, {
      sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: navigator.camera.DestinationType.FILE_URI,
      encodingType: navigator.camera.EncodingType.PNG
    } );
  }
}

WizardPage.transitions = {
  disabled: {
    key: 'disabled',
    label: 'Next'
  },
  next: {
    key: 'next',
    label: 'Next'
  },
  skip: {
    key: 'skip',
    label: 'Skip'
  },
  submit: {
    key: 'submit',
    label: 'Submit'
  }
};

export default WizardPage;
