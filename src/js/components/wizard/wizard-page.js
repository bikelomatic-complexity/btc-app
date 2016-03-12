import React, { Component } from 'react';
import { keys, pick, assign, isFunction, bindAll, isEmpty } from 'lodash';
import { RaisedButton } from 'material-ui';

import '../../../css/wizard.css';

export class WizardPage extends Component {
  constructor(props) {
    super(props);
    bindAll(this, 'link');
  }

  getPageFields() {
    return [];
  }

  getPageValues() {
    return assign( {}, pick( this.state, this.getPageFields() ) );
  }

  getPageContent() {
    return <div />;
    console.error('WizardPage#getPageContent() is abstract');
  }

  getTransition() {
    return WizardPage.transitions.disabled;
    console.error('WizardPage#getPageContent() is abstract');
  }

  isDisabled() {
    return this.getTransition() === WizardPage.transitions.disabled;
  }

  componentWillUnmount( ) {
    const { persist } = this.props;

    const values = this.getPageValues();
    if( keys(values).length > 0 && isFunction( persist ) ) {
      persist( values );
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

    // Add an event listener that sets state @ `field`
    props[ method ] = (event, key, value) => {
      this.setState( { [ field ]: value || event.target.value } );
    };

    // Set the input's default value at the `field` key in newPoint
    const { newPoint } = this.props;
    if( newPoint ) {
      props.defaultValue = newPoint[ field ] || '';
    }

    return props;
  }

  render() {
    const { onNext } = this.props;
    const { label } = this.getTransition();

    return (
      <div className="tabs-content">
        { this.getPageContent() }
        <RaisedButton className="tabs-content__action"
          secondary
          disabled={ this.isDisabled() }
          onClick={ onNext }
          label={ label } />
      </div>
    );
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
