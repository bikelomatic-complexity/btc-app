/*global describe before after beforeEach afterEach it $*/
import chai, { expect } from 'chai';

/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDom from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
/*eslint-enable no-unused-vars*/

import { PeekPointCard } from '../../../www/js/components/peek-point-card';
import { MockPoints } from '../../mock-data/mock-points';

import sd from 'skin-deep';


describe('<PointCardPeek />', function(){
  beforeEach(function(){
    this.sample = MockPoints[0];
    const tree = sd.shallowRender(
	  <PeekPointCard
	    point={this.sample}
	  />
	);
    this.instance = tree.getMountedInstance();
    this.vdom = tree.getRenderOutput();	
  });
  
  it('should show see more', function(){
    /*var foundSpans = TestUtils.scryRenderedDOMComponentsWithTag(
	  this.card, 'span'
    );
    foundSpans[3].innerText.should.be.equal("See More");*/
    //console.log(this.vdom);
	//console.log(this.vdom.props);
	//console.log(this.vdom.props.children);
	console.log(this.vdom.props.children[2]);
	//console.log(this.vdom.props.children.length);
  });

  it('should show close', function(){
    /*var foundSpans = TestUtils.scryRenderedDOMComponentsWithTag(
	  this.card, 'span'
    );
    foundSpans[4].innerText.should.be.equal("Close");*/
  });	
});