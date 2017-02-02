/*global describe beforeEach afterEach it*/
import sinon from 'sinon';
import sd from 'skin-deep';

/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDom from 'react-dom';
import { LoginPage } from '../../../src/js/containers/login-page';
/*eslint-enable no-unused-vars*/

import * as login from '../../../src/js/reducers/account/login';
import * as drawer from '../../../src/js/reducers/btc-drawer';

describe( '<LoginPage />', function() {
  beforeEach( function() {
    this.setDrawer = sinon.stub( drawer, 'setDrawer' );
    this.login = sinon.stub( login, 'login' );
    this.dispatch = sinon.stub();
    this.history = { push: sinon.stub() };
  } );
  afterEach( function() {
    this.login.restore();
    this.setDrawer.restore();
  } );
  it( 'should dispatch login when an action occurs', function() {
    const account = { login: {} };
    const tree = sd.shallowRender( (
      <LoginPage account={ account }
        dispatch={ this.dispatch }
        history={ this.history } />
      ) );

    this.login.callsArg( 1 ); // the success callback

    const values = {};
    tree.getMountedInstance().onLogin( values );

    sinon.assert.calledWith( this.login, values );
    sinon.assert.called( this.history.push );
    sinon.assert.called( this.dispatch );
  } );
  it( 'should set the drawer on mount', function() {
    const account = { login: {} };
    const tree = sd.shallowRender( (
      <LoginPage account={ account }
        dispatch={ this.dispatch } />
      ) );

    tree.getMountedInstance().componentDidMount();

    this.dispatch.callsArg( 1 );
    sinon.assert.called( this.dispatch );
    sinon.assert.called( this.setDrawer );
  } );
} );
