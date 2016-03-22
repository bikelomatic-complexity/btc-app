/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { keys, pick, assign, isFunction, bindAll, isEmpty } from 'lodash';
import { RaisedButton } from 'material-ui';
/*eslint-enable no-unused-vars*/

import { imgSrcToBlob } from 'blob-util';

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
    bindAll( this, 'link', 'onPhotoAdd', 'onClick' );

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

  // Return an transition type from WizardPage.transitions to modify the
  // effect of the ``next'' action button.
  getPreferredTransition() {
    console.error( 'WizardPage#getPageContent() is abstract' );
    return WizardPage.transitions.disabled;
  }

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

  // When a page unmounts, persist the page values obtained via
  // `getpageValues()'. The `persist` function must be supplied by the
  // add point or update point pages.
  // componentWillUnmount() {
  //   const {persist} = this.props;
  //
  //   const values = this.getPageValues();
  //   if ( keys( values ).length > 0 && isFunction( persist ) ) {
  //     persist( values );
  //   }
  // }

  onClick() {
    const {persist, onNext} = this.props;

    const values = this.getPageValues();
    console.log( values );
    if( keys( values ).length > 0 && isFunction( persist ) ) {
      persist( values, onNext );
    } else {
      onNext();
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
      if( key instanceof Date ) {
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
        { this.getPageContent() }
        <RaisedButton className="tabs-content__action"
          secondary
          disabled={ this.isDisabled() }
          onClick={ this.onClick }
          label={ label } />
      </div>
      );
  }

  // This logic will not work on the browser:
  // [CB-9852](https://issues.apache.org/jira/browse/CB-9852)
  onPhotoAdd() {
    navigator.camera.getPicture( imageSrc => {
      imgSrcToBlob( imageSrc ).then(
        coverBlob => this.setState( { coverBlob } )
      );
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
