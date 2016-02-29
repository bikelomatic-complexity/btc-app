import chai, { expect } from 'chai';
import sinon from 'sinon';

import React from 'react';
import ReactDom from 'react-dom';

import sd from 'skin-deep';

import { LoginPage } from '../../www/js/containers/login-page';
import * as login from '../../www/js/reducers/account/login';

describe( '<LoginPage />', function() {
  beforeEach(function() {
    this.login = sinon.stub(login, 'login');
    this.dispatch = sinon.stub();
    this.history = { push: sinon.stub() };
  });
  afterEach(function() {
    this.login.restore();
  });
  it( 'should dispatch login when an action occurs', function() {
    const account = { login: {} };
    const tree = sd.shallowRender((
      <LoginPage account={ account }
        dispatch={ this.dispatch }
        history={ this.history }/>
    ));

    this.login.callsArg(1); // the success callback

    const values = {};
    tree.getMountedInstance().onLogin(values);

    sinon.assert.calledWith(this.login, values);
    sinon.assert.called(this.history.push);
    sinon.assert.called(this.dispatch);
  });
  it( 'should set the drawer on mount', function() {
    const setDrawer = sinon.spy();

    const account = { login: {} };
    const tree = sd.shallowRender((
      <LoginPage account={account} setDrawer={setDrawer} />
    ));

    tree.getMountedInstance().componentDidMount();

    sinon.assert.called(setDrawer);
  })
});
