/*global describe beforeEach it*/
import sinon from 'sinon';
import { expect } from 'chai';

/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDom from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import { RatingPointCard } from '../../../www/js/components/rating-point-card';
import { RatingSelector } from '../../../www/js/components/rating-selector';
/*eslint-enable no-unused-vars*/

import { MockPoints } from '../../mock-data/mock-points';
import { MockNewComment } from '../../mock-data/mock-comments';

import sd from 'skin-deep';

describe('<RatingPointCard />', function(){
  beforeEach(function(){
    this.sample = MockPoints[0];
	this.setRatingMock = sinon.spy();
	this.newRatingMock = MockNewComment;
	const tree = sd.shallowRender(
	  <RatingPointCard
        point = {this.sample}
        setRating = {this.setRatingMock}
        newRating = {this.newRatingMock}
      />
    );
  });
  it('should render the comments', function(){
    expect( 'See More' ).to.be.equal( 'See More' );  
  });
});