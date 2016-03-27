/*eslint-disable no-unused-vars*/
/*global describe before after beforeEach afterEach it $*/
import chai, { expect } from 'chai';
import sd from 'skin-deep';

import React from 'react';
import ReactDom from 'react-dom';
import { PointList } from '../../../src/js/components/point-list';
/*eslint-enable no-unused-vars*/

describe( '<PointList />', function() {
  it( 'should have list of points from points props', function() {
    const points = [
      { _id: 'PointA', name: 'PointA', type: 'other', coverUrl: '' },
      { _id: 'PointB', name: 'PointB', type: 'other', coverUrl: '' },
      { _id: 'PointC', name: 'PointC', type: 'other', coverUrl: '' },
      { _id: 'PointD', name: 'PointD', type: 'other', coverUrl: '' }
    ];

    const tree = sd.shallowRender( (
      <PointList points={ points }
        clickAction={ function() {} } />
    ) );

    const listItems = tree.everySubTree( 'ListItem' );

    listItems.forEach( ( listItem, index ) => {
      expect( listItem.props.primaryText ).to.be.equal( points[ index ].name );
    } );
  } );

  it( 'should have a button if an icon is passed down', function() {
    const points = [
      { _id: 'PointA', name: 'PointA', type: 'other', coverUrl: '' },
      { _id: 'PointB', name: 'PointB', type: 'other', coverUrl: '' },
    ];

    const tree = sd.shallowRender( (
      <PointList points={ points }
        buttonIcon='clear'
        buttonAction={ function() {} }
        clickAction={ function() {} } />
    ) );

    const iconButtons = tree.everySubTree( 'IconButton' );

    expect( iconButtons.length ).to.be.greaterThan( 0 );
  } );

  it( 'should not have a button if no icons are passed down', function() {
    const points = [
      { _id: 'PointA', name: 'PointA', type: 'other', coverUrl: '' },
      { _id: 'PointB', name: 'PointB', type: 'other', coverUrl: '' },
    ];

    const tree = sd.shallowRender( (
      <PointList points={ points }
        clickAction={ function() {} } />
    ) );

    const iconButtons = tree.everySubTree( 'IconButton' );


    expect( iconButtons.length ).to.be.equal( 0 );
  } );
} );
