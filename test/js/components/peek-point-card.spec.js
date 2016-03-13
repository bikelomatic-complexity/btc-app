/*global describe beforeEach it*/
import { expect } from 'chai';

/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDom from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import { PeekPointCard } from '../../../www/js/components/peek-point-card';
/*eslint-enable no-unused-vars*/

import { MockPoints } from '../../mock-data/mock-points';

import sd from 'skin-deep';


describe('<PointCardPeek />', function(){
  beforeEach(function(){
    this.mockPoint = MockPoints[0];
    const tree = sd.shallowRender(
      <PeekPointCard
        point={this.mockPoint}
      />
    );
    this.instance = tree.getMountedInstance();
    this.vdom = tree.getRenderOutput();	
  });
  
  it('should show see more', function(){
    var leftButton = this.vdom.props.children[2].props.children[0];
    expect ( leftButton.props.label ).to.be.equal( 'See More' );
  });

  it('should show close', function(){
    var rightButton = this.vdom.props.children[2].props.children[1];
    expect ( rightButton.props.label ).to.be.equal( 'Close' );
  });	
});
