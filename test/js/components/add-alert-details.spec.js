/*eslint-disable no-unused-vars*/
/*global describe before after beforeEach afterEach it $*/
import sinon from 'sinon';
import sd from 'skin-deep';

import React from 'react';
import ReactDom from 'react-dom';
import { AddAlertDetails } from '../../../www/js/components/add-alert-details';
/*eslint-enable no-unused-vars*/

describe( '<AddAlertDetails />', function() {
  it( 'should set the drawer on mount', function() {
    const setDrawer = sinon.spy();
    const newPoint = {
      location: [ 0, 0 ],
      name: 'test'
    };

    const tree = sd.shallowRender( (
      <AddAlertDetails newPoint={ newPoint }
        setDrawer={ setDrawer } />
      ) );

    tree.getMountedInstance().componentDidMount();

    sinon.assert.called( setDrawer );
  } );
  it( 'should set the name on onNameUpdate', function() {
    const setPointName = sinon.spy();
    const newPoint = {
      location: [ 0, 0 ],
      name: 'test'
    };

    const eventObject = { target: { value: 'test name' } };

    const tree = sd.shallowRender( (
      <AddAlertDetails newPoint={ newPoint }
        setPointName={ setPointName } />
      ) );

    tree.getMountedInstance().onNameUpdate( eventObject );

    sinon.assert.called( setPointName );
  } );
} );
