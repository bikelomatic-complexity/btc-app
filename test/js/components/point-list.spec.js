/*eslint-disable no-unused-vars*/
/*global describe before after beforeEach afterEach it $*/
import chai, { expect } from 'chai';
import sd from 'skin-deep';

import React from 'react';
import ReactDom from 'react-dom';
import { PointList } from '../../../www/js/components/point-list';
/*eslint-enable no-unused-vars*/

describe( '<PointList />', function() {
  it( 'should have list of points from props', function() {
    const points = [
      {name: 'PointA', type: 'other', coverUrl: ''},
      {name: 'PointB', type: 'other', coverUrl: ''},
      {name: 'PointC', type: 'other', coverUrl: ''},
      {name: 'PointD', type: 'other', coverUrl: ''}
    ];

    const tree = sd.shallowRender( (
      <PointList points={points} />
      ) );

    const cardHeaders = tree.everySubTree('CardHeader');

    cardHeaders.forEach((cardHeader, index) => {
      expect(cardHeader.props.title).to.be.equal(points[index].name);
    });
  } );
} );
