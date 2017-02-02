/*eslint-disable no-unused-vars*/
/*global describe before after beforeEach afterEach it $*/
import chai, { expect } from 'chai';
import sd from 'skin-deep';

import React from 'react';
import ReactDom from 'react-dom';
import { Drawer } from '../../../src/js/containers/btc-drawer';
/*eslint-enable no-unused-vars*/

describe( '<Drawer />', function() {
  it( 'should be closed by default', function() {
    const tree = sd.shallowRender( (
      <Drawer drawer="New Page"
        login={ { loggedIn: false } } />
      ) );

    const instance = tree.getMountedInstance();

    expect( instance.state.open ).to.be.false;
  } );
  it( 'should set the title from the drawer prop', function() {
    const tree = sd.shallowRender( (
      <Drawer drawer="New Page"
        login={ { loggedIn: false } } />
      ) );

    const appBar = tree.dive( [ 'AppBar' ] );
    const appBarInstance = appBar.getMountedInstance();

    expect( appBarInstance.props.title ).to.be.equal( 'New Page' );
  } );
} );
