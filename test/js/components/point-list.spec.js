/*eslint-disable no-unused-vars*/
/*global describe before after beforeEach afterEach it $*/
import chai, { expect } from 'chai';
import sd from 'skin-deep';

import React from 'react';
import ReactDom from 'react-dom';
import { PointList } from '../../../src/js/components/point-list';
/*eslint-enable no-unused-vars*/

describe( '<PointList />', function() {
  it( 'should have list of points from props', function() {
    const points = [
      { _id: 'PointA', name: 'PointA', type: 'other', coverUrl: '' },
      { _id: 'PointB', name: 'PointB', type: 'other', coverUrl: '' },
      { _id: 'PointC', name: 'PointC', type: 'other', coverUrl: '' },
      { _id: 'PointD', name: 'PointD', type: 'other', coverUrl: '' }
    ];

    const tree = sd.shallowRender( (
      <PointList points={ points }
        onPointClick={ function() {} } />
      ) );

    const cardHeaders = tree.everySubTree( 'CardHeader' );

    cardHeaders.forEach( ( cardHeader, index ) => {
      expect( cardHeader.props.title ).to.be.equal( points[ index ].name );
    } );
  } );
} );
