/*global describe beforeEach it*/
import sinon from 'sinon';
import { assert } from 'chai';

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
    this.instance = tree.getMountedInstance();
    this.vdom = tree.getRenderOutput();
  });
  it('should render the comments', function(){
    var commentList = this.vdom.props.children[1].props.children[0];
    for (var i = 0; i < commentList.length; i++){
      assert.isDefined(commentList[i].props.children, 'Comment entry does not exist');
      var comment = commentList[i].props.children;
      
      assert.isDefined(comment[0].props.children, 'Username does not exist');
      assert.isDefined(comment[2].props.children, 'Comment does not exist');
      var userText = comment[0].props.children;
      var commentText = comment[2].props.children;

      assert.isString(userText, 'Username is not a string');
      assert.isString(commentText, 'Comment is not a string');
    }
  });
});