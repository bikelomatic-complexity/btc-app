import Chai from 'chai';
const should = Chai.should()

// import react, our view library
import React from 'react';

// import skin-deep, a react library for shallow rendering components
import sd from 'skin-deep';

// import the component we'll be testing
import PointCard from '../www/js/components/point-card';

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

describe('the PointCard component', () => {
  describe('render', () => {

    it('should have an id ', () => {
      vdom.props.id.should.be.equal( "mdl-map-card" );
    });

    it('should have a title', () => {
      const cardTitle = vdom.props.children[0];
      cardTitle.props.children.should.be.equal(sample.name);
    });

    it('should have a description', () => {
      const cardTitle = vdom.props.children[1];
      cardTitle.props.children.should.be.equal(sample.description);
    });

  })
});
