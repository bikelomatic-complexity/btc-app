import chai, { expect } from 'chai';
import chai$ from 'chai-jquery';

chai.use(chai$);

import React from 'react';
import ReactDom from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import sd from 'skin-deep';

import { Page, LetterheadPage } from '../../www/js/components/page';

describe( '<Page />', function() {
  before(function() {
    this.$fixture = $('<div class="fixture" />').appendTo('body');
    this.$fixture.css('width', '1000px');
  } );
  beforeEach(function() {
    const component = renderIntoDocument(<Page />);
    this.page = ReactDom.findDOMNode(component)
    this.$node = $(this.page);
    this.$node.appendTo(this.$fixture);
  } );
  afterEach(function() {
    this.$fixture.empty();
  } );
  after(function() {
    this.$fixture.remove();
  } );
  it( 'should exist', function() {
    expect(this.$node).to.exist;
  } );
  it( 'should have width 500px', function() {
    expect(this.$node).to.have.css('max-width', '500px');
    expect(this.$node).to.have.css('width', '500px');
  } );
  it( 'should have appropriate margins and padding', function() {
    expect(this.$node).to.have.css('padding', '10px');

    const lmargin = parseInt(this.$node.css('margin-left'))
    const rmargin = parseInt(this.$node.css('margin-right'));
    expect(lmargin === rmargin).to.be.true;
  } );
} );
describe( '<LetterheadPage />', function() {
  beforeEach(function() {
    const tree = sd.shallowRender(<LetterheadPage />);

    this.instance = tree.getMountedInstance();
    this.vdom = tree.getRenderOutput();
  } );
  it( 'should contain a logo', function() {
    const img = this.vdom.props.children[0];
    expect(img).to.exist;
    expect(img.type).to.equal('img');
    expect(img.props.className).to.equal('page__logo');
  } );
} );
