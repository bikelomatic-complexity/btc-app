/*global describe before after beforeEach afterEach it $*/
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sd from 'skin-deep';
import { renderIntoDocument, 
  findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDom from 'react-dom';
import { PointMap } from '../../../www/js/components/point-map';
/*eslint-enable no-unused-vars*/

describe( '<PointMap />', function() {
  it( 'should call selectPoint when not adding a point', function() {
    const selectMarker = sinon.spy();
    const component = renderIntoDocument(<PointMap addPoint={ false } 
      services={ [{location:[0,0]}] }
      selectMarker={ selectMarker }
      mapState={ {center:[0,0], loading:false, zoom:3}}
      filters={ {activeFilters:[]} }
      settings={ {} }
    />);

    // get the first marker
    const marker = findRenderedDOMComponentWithClass(component, 'leaflet-marker-icon');
    // click it
    marker.click();

    expect( selectMarker.called ).to.be.true;
  } );
} );