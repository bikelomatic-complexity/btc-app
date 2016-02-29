/*global describe beforeEach it*/
import { expect } from 'chai';
import sinon from 'sinon';
import sd from 'skin-deep';

/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDom from 'react-dom';
import { Block, BlockFooter, FormBlock, errorProps } from '../../../www/js/components/block';
/*eslint-enable no-unused-vars*/

describe( '<Block />', function() {
  it( 'should pass through a header object', function() {
    const header = <div />;
    const tree = sd.shallowRender( <Block header={ header } /> );
    const vdom = tree.getRenderOutput();

    expect( vdom.props.children[ 0 ] ).to.equal( header );
  } );
  it( 'should handle header text', function() {
    const tree = sd.shallowRender( <Block header='text' /> );

    const header = tree.subTree( 'div' );
    expect( header.text() ).to.equal( 'text' );
    expect( header.props.className ).to.not.match( /entry__header--error/ );
  } );
  it( 'should handle problem headers', function() {
    const tree = sd.shallowRender( <Block header='problem' problem /> );

    const header = tree.subTree( 'div' );
    expect( header.props.className ).to.match( /entry__header--error/ );
  } );
  it( 'should pass through a footer object', function() {
    const footer = <div />;
    const tree = sd.shallowRender( <Block footer={ footer } /> );
    const vdom = tree.getRenderOutput();

    expect( vdom.props.children[ 2 ] ).to.equal( footer );
  } );
  it( 'should handle footer text', function() {
    const tree = sd.shallowRender( <Block footer='text' /> );

    const footer = tree.subTree( 'div' );
    expect( footer.text() ).to.equal( 'text' );
  } );
} );

describe( '<FormBlock />', function() {
  beforeEach( function() {
    this.fields = [ {
      name: 'email',
      hint: 'Email'
    }, {
      name: 'password',
      hint: 'Password'
    }, {
      name: 'first',
      hint: 'First'
    } ];
    this.tree = sd.shallowRender( <FormBlock fields={ this.fields } /> );
  } );
  it( 'should create enough text boxes', function() {
    const boxes = this.tree.everySubTree( 'TextField' );

    expect( boxes ).to.have.lengthOf( this.fields.length );
  } );
  it( 'should use HTML5 keyboards', function() {
    const pred = type => node => node.type === type;

    const email = this.tree.subTree( 'TextField', pred( 'email' ) );
    expect( email ).to.be.ok;

    const password = this.tree.subTree( 'TextField', pred( 'password' ) );
    expect( password ).to.be.ok;
  } );
  it( 'should display validation errors', function() {
    const validation = [ { dataPath: '.password', message: 'message' } ];
    const tree = sd.shallowRender( (
      <FormBlock fields={ this.fields } validation={ validation } />
      ) );

    const password = tree.subTree( 'TextField', node => node.errorText );
    expect( password ).to.be.ok;
  } );
  it( 'should call `onAction()` with object as the only arg', function() {
    const onAction = sinon.spy();
    const tree = sd.shallowRender( (
      <FormBlock fields={ this.fields } onAction={ onAction } />
      ) );

    tree.subTree( 'RaisedButton' ).props.onClick();

    // In reality, the argument should have email, password, and first props,
    // but refs are not created during the shallow render.
    sinon.assert.calledWith( onAction, {} );
  } );
} );

describe( 'errorProps()', function() {
  it( 'should handle undefined `error`', function() {
    const validation = [];
    const result = errorProps( undefined, validation );
    expect( result ).to.not.have.property( 'problemText' );
    expect( result ).to.have.property( 'validation', validation );
  } );
  it( 'should handle undefined `validation`', function() {
    const result = errorProps( 'error', undefined );
    expect( result ).to.not.have.property( 'validation' );
    expect( result ).to.have.property( 'problemText', 'error' );
  } );
} );
