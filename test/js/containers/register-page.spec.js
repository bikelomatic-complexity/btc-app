/*global describe beforeEach afterEach it*/
import sinon from 'sinon';
import sd from 'skin-deep';

/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDom from 'react-dom';
import { RegisterPage } from '../../../src/js/containers/register-page';
/*eslint-enable no-unused-vars*/

import * as registration from '../../../src/js/reducers/account/registration';
import * as drawer from '../../../src/js/reducers/btc-drawer';

describe( '<RegisterPage />', function() {
  beforeEach( function() {
    this.setDrawer = sinon.stub( drawer, 'setDrawer' );
    this.register = sinon.stub( registration, 'register' );
    this.dispatch = sinon.stub();
    this.history = { push: sinon.stub() };
  } );
  afterEach( function() {
    this.register.restore();
    this.setDrawer.restore();
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
    const account = { registration: {} };
    const tree = sd.shallowRender( (
      <RegisterPage account={ account }
        dispatch={ this.dispatch } />
      ) );

    tree.getMountedInstance().componentDidMount();

    this.dispatch.callsArg( 1 );
    sinon.assert.called( this.dispatch );
    sinon.assert.called( this.setDrawer );
  } );
} );
