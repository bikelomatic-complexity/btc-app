/*global describe beforeEach afterEach it*/
import sinon from 'sinon';
import sd from 'skin-deep';

/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDom from 'react-dom';
import { RegisterPage } from '../../../www/js/containers/register-page';
/*eslint-enable no-unused-vars*/

import * as registration from '../../../www/js/reducers/account/registration';

describe( '<RegisterPage />', function() {
  beforeEach( function() {
    this.register = sinon.stub( registration, 'register' );
    this.dispatch = sinon.stub();
    this.history = { push: sinon.stub() };
  } );
  afterEach( function() {
    this.register.restore();
  } );
  it( 'should dispatch login when an action occurs', function() {
    const account = { registration: {} };
    const tree = sd.shallowRender( (
      <RegisterPage account={ account }
        dispatch={ this.dispatch }
        history={ this.history } />
      ) );

    this.register.callsArg( 1 ); // the success callback

    const values = {};
    tree.getMountedInstance().onRegister( values );

    sinon.assert.calledWith( this.register, values );
    sinon.assert.called( this.history.push );
    sinon.assert.called( this.dispatch );
  } );
  it( 'should set the drawer on mount', function() {
    const setDrawer = sinon.spy();

    const account = { registration: {} };
    const tree = sd.shallowRender( (
      <RegisterPage account={ account } setDrawer={ setDrawer } />
      ) );

    tree.getMountedInstance().componentDidMount();

    sinon.assert.called( setDrawer );
  } );
} );
