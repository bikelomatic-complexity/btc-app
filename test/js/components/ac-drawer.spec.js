/*eslint-disable no-unused-vars*/
/*global describe before after beforeEach afterEach it $*/
import chai, { expect } from 'chai';
import sd from 'skin-deep';

import React from 'react';
import ReactDom from 'react-dom';
import { ACDrawer } from '../../../www/js/components/ac-drawer';
/*eslint-enable no-unused-vars*/

describe( '<ACDrawer />', function() {
  it( 'should be closed by default', function() {
    const tree = sd.shallowRender( (
      <ACDrawer page='New Page' account={ {login: {}} } />
    ) );

    const instance = tree.getMountedInstance();

    expect(instance.state.open).to.be.false;
  } );
  it( 'should make the title the page property', function() {
    const tree = sd.shallowRender( (
      <ACDrawer page='New Page' account={ {login: {}} } />
    ) );

    const appBar = tree.dive(['AppBar']);
    const appBarInstance = appBar.getMountedInstance();

    expect(appBarInstance.props.title).to.be.equal('New Page');
  } );
} );
