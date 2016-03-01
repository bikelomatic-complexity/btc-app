import Chai from 'chai';
const should = Chai.should()

import React from 'react';
var TestUtils = require('react-addons-test-utils');

import { PointCard } from '../www/js/components/point-card';
import { MockPoints } from './mock-data/mock-points';


describe('Point Card', function(){
  before(function(){
	this.sample = MockPoints[0];
    this.card = TestUtils.renderIntoDocument(
	  <PointCard 
	    point={this.sample}
		show="peek"
	  />
	);
  });
  
  describe('Peek', function(){
    it('should show see more', function(){
	  var foundSpans = TestUtils.scryRenderedDOMComponentsWithTag(
	    this.card, 'span'
	  );
	  foundSpans[4].innerText.should.be.equal("See More");
	});

    it('should show close', function(){
	  var foundSpans = TestUtils.scryRenderedDOMComponentsWithTag(
	    this.card, 'span'
	  );
	  foundSpans[5].innerText.should.be.equal("Close");
	});	
  });
});