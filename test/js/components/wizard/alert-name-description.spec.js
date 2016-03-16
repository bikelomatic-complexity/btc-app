/*eslint-disable no-unused-vars*/
/*global describe before after beforeEach afterEach it $*/
import sinon from 'sinon';
import sd from 'skin-deep';

import React from 'react';
import ReactDom from 'react-dom';
import { AlertNameDescription } from '../../../../src/js/components/wizard/alert-name-description';
/*eslint-enable no-unused-vars*/

describe( '<AlertNameDescription />', function() {
  it( 'should set the drawer on mount', function() {
    const setDrawer = sinon.spy();
    const newPoint = {
      location: [ 0, 0 ],
      name: 'test'
    };

    const tree = sd.shallowRender( (
      <AlertNameDescription newPoint={ newPoint }
        setDrawer={ setDrawer } />
      ) );

    tree.getMountedInstance().componentDidMount();

    sinon.assert.called( setDrawer );
  } );
  it( 'should persist the alert name on componentWillUnmount', function( done ) {
    const persist = sinon.spy();

    const tree = sd.shallowRender( (
      <AlertNameDescription newPoint={ { location: [ 0, 0 ] } }
        persist={ persist } />
      ) );

    const instance = tree.getMountedInstance();
    instance.setState( {
      name: 'some alert'
    }, ( ) => {
      instance.componentWillUnmount();
      sinon.assert.calledWithMatch( persist, { name: 'some alert' } );
      done();
    } );
  } );
} );
