/*global describe beforeEach it*/
import { expect } from 'chai';

/*eslint-disable no-unused-vars*/
import React from 'react';
import { ViewPointCard } from '../../../../src/js/components/point-card/view-point-card';
/*eslint-enable no-unused-vars*/

import { mockPoints } from '../../../mock-data/mock-points';

import sd from 'skin-deep';

describe( '<ViewPointCard />', function() {
  beforeEach( function() {
    const tree = sd.shallowRender(
      <ViewPointCard points={ mockPoints }
        params={ { id: 'point/service/rit/abcdef' } } />
    );
    this.tree = tree.dive( [ 'CardActions' ] );
  } );

  it( 'should show see less', function() {
    const button = this.tree.everySubTree( 'FlatButton' )[ 0 ];
    expect( button.getRenderOutput().props )
      .to.have.property( 'label', 'See Less' );
  } );
  it( 'should show close', function() {
    const button = this.tree.everySubTree( 'FlatButton' )[ 1 ];
    expect( button.getRenderOutput().props )
      .to.have.property( 'label', 'Close' );
  } );
} );
