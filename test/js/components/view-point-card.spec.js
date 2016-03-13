/*global describe beforeEach it*/
import { expect } from 'chai';

/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDom from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import { ViewPointCard } from '../../../www/js/components/view-point-card';
/*eslint-enable no-unused-vars*/

import { MockPoints } from '../../mock-data/mock-points';

import sd from 'skin-deep';

describe( '<ViewPointCard />', function() {
  beforeEach(function(){
    this.mockPoint = MockPoints[0];
    const tree = sd.shallowRender(
      <ViewPointCard
        point = {this.mockPoint}
      />
    );
    this.instance = tree.getMountedInstance();
    this.vdom = tree.getRenderOutput();	
  });
  
  it('should show see less', function(){
    var leftButton = this.vdom.props.children[2].props.children[0];
    expect( leftButton.props.label ).to.be.equal( 'See Less' );
  });
  it('should show close', function(){
    var rightButton = this.vdom.props.children[2].props.children[1];
    expect( rightButton.props.label ).to.be.equal( 'Close' );	
  });
});
