/*global describe beforeEach it*/
import { expect } from 'chai';

/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDom from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import { PeekPointCard } from '../../../../src/js/components/point-card/peek-point-card';
/*eslint-enable no-unused-vars*/

import { MockPoints } from '../../../mock-data/mock-points';

import sd from 'skin-deep';


describe( '<PeekPointCard />', function() {
  beforeEach( function() {
    this.mockPoint = MockPoints[ 0 ];
    const tree = sd.shallowRender(
      <PeekPointCard point={ this.mockPoint } />
    );
    this.tree = tree.dive( [ 'CardActions' ] );
  } );

  it( 'should show see more', function() {
    const button = this.tree.everySubTree( 'FlatButton' )[ 0 ];
    expect( button.getRenderOutput().props )
      .to.have.property( 'label', 'See More' );
  } );

  it( 'should show close', function() {
    const button = this.tree.everySubTree( 'FlatButton' )[ 1 ];
    expect( button.getRenderOutput().props )
      .to.have.property( 'label', 'Close' );
  } );
} );
