import Chai from 'chai';
const should = Chai.should()

// import react, our view library
import React from 'react';

// import skin-deep, a react library for shallow rendering components
import sd from 'skin-deep';

// import the component we'll be testing
import { PointCard } from '../www/js/components/point-card';

// import sample data for tests
import { SamplePoints } from './mock-data';

// vdom is the rendered page
// instance is the react component
let vdom, instance, sample;

beforeEach(() => {
  sample = SamplePoints[0];
  const tree = sd.shallowRender(
    <PointCard
      point={sample}
      show={true}
    />
  );

  instance = tree.getMountedInstance();
  vdom = tree.getRenderOutput();
});

describe('PointCard', () => {

  describe('minimized', () => {

    describe('render', () => {
      let cardComponent;
      beforeEach(() => {
        cardComponent = vdom.props.children;
      });

      it('should have an id ', () => {
        cardComponent.props.id.should.be.equal( "mdl-map-card" );
      });

      it('should have a title', () => {
        const cardTitle = cardComponent.props.children[0];
        cardTitle.props.children.should.be.equal(sample.name);
      });

      it('should have a description', () => {
        const cardDetails = cardComponent.props.children[1];
        const cardDescription = cardDetails.props.children[0];
        cardDescription.should.be.equal(sample.description);
      });
    });

    describe('state', () => {
      it('should start not full screen', () => {
          instance.state.fullScreen.should.not.be.true;
      });
    });

  });

  describe('full screen', () => {

    beforeEach(() => {
      instance.setState({fullScreen:true});
    });

    describe('render', () => {
      let cardComponent;
      beforeEach(() => {
        cardComponent = vdom.props.children;
      });

      it('should have an id ', () => {
        cardComponent.props.id.should.be.equal( "mdl-map-card" );
      });

      it('should have a title', () => {
        const cardTitle = cardComponent.props.children[0];
        cardTitle.props.children.should.be.equal(sample.name);
      });

      it('should have a description', () => {
        const cardDetails = cardComponent.props.children[1];
        const cardDescription = cardDetails.props.children[0];
        cardDescription.should.be.equal(sample.description);
      });
    });

    describe('state', () => {
      it('should be full screen', () => {
          instance.state.fullScreen.should.be.true;
      });
    });

  });
});
