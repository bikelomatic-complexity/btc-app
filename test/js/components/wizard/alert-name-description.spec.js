/*eslint-disable no-unused-vars*/
/*global describe before after beforeEach afterEach it $*/
import sinon from 'sinon';
import sd from 'skin-deep';

import React from 'react';
import ReactDom from 'react-dom';
import { AlertNameDescription } from '../../../../src/js/components/wizard/alert-name-description';
/*eslint-enable no-unused-vars*/

const point = {
  location: [ 0, 0 ],
  name: 'test'
};

describe( '<AlertNameDescription />', function() {
  it( 'should set the drawer on mount', function() {
    const setDrawer = sinon.spy();
    const tree = sd.shallowRender( (
      <AlertNameDescription point={ point }
        setDrawer={ setDrawer } />
      ) );

    tree.getMountedInstance().componentDidMount();

    sinon.assert.called( setDrawer );
  } );
  it( 'should persist the alert name on persistBefore', function( done ) {
    const persist = sinon.stub();
    persist.callsArg(1);

    const tree = sd.shallowRender( (
      <AlertNameDescription point={ point }
        persist={ persist } />
      ) );

    const instance = tree.getMountedInstance();
    instance.setState( {
      name: 'some alert'
    }, ( ) => {
      instance.persistBefore( () => {
        sinon.assert.calledWithMatch( persist, { name: 'some alert' } );
        done();
      } );
    } );
  } );
} );
