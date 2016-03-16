/*global describe beforeEach it*/
import { expect } from 'chai';

/*eslint-disable no-unused-vars*/
import React from 'react';
import { RatingPointCard } from '../../../../src/js/components/point-card/rating-point-card';
/*eslint-enable no-unused-vars*/

import { MockPoints } from '../../../mock-data/mock-points';

import sd from 'skin-deep';

describe( '<RatingPointCard />', function() {
  beforeEach( function() {
    this.tree = sd.shallowRender(
      <RatingPointCard point={ MockPoints[ 0 ] } />
    );
  } );
  it( 'should render the comment entry', function() {
    const entry = this.tree.subTree( 'FormBlock' );
    expect( entry ).to.be.ok;
  } );
} );
