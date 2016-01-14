import React, {Component} from 'react';

import { Layout, Header, Content } from 'react-mdl';
import ACDrawer from './ac-drawer';
import PointMap from './point-map';

// import redux components
import { connect } from 'react-redux';

// import pouch library
import ACPouch from '../ac-pouch';
import {pluck} from 'underscore';

import HammerPointCard from './hammer-point-card';

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        alerts : [{
          _id: '0',
          name: 'Fire',
          location: [43.0830, -77.6722],
          type: 'alert',
          description: 'There is a fire in this location. Beware!',
          image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg',
          comments: [],
          dateCreated: '',
          flag: [],
          latest: '',
          resolutions: []
        }],
        services: [{
          _id: '0',
          name: 'Rochester Institute of Technology',
          description: 'Rochester Institute of Technology is a private university located within the town of Henrietta in the Rochester, New York metropolitan area. RIT is composed of nine academic colleges, including National Technical Institute for the Deaf.',
          type: 'School',
          location: [43.0848, -77.6744],
          image: 'http://www.usnews.com/img/college-photo_3121._445x280-zmm.JPG',
          comments: [],
          dateCreated: '',
          flag: [],
          amenities: ["housing", "food and drinks", "medical center"],
          schedule: [
            {
              // default season listed first
              days: [
                {day:'Sunday', opens: '10:00 AM', closes: '4:00 PM'},
                {day:'Monday', opens: '8:00 AM', closes: '10:00 PM'},
                {day:'Tuesday', opens: '8:00 AM', closes: '10:00 PM'},
                {day:'Wednesday', opens: '8:00 AM', closes: '6:00 PM'},
                {day:'Thursday', opens: '8:00 AM', closes: '10:00 PM'},
                {day:'Friday', opens: '8:00 AM', closes: '10:00 PM'},
                {day:'Saturday', opens: '10:00 AM', closes: '4:00 PM'}
              ]
            },
            {
              // november 1st to decemeber 31st
              seasonStart: {date:1, month:10},
              seasonEnd: {date:31, month:11},
              days: [
                {day:'Monday', opens: '11:00 AM', closes: '3:00 PM'},
                {day:'Tuesday', opens: '11:00 AM', closes: '3:00 PM'},
                {day:'Wednesday', opens: '1:00 PM', closes: '6:00 PM'},
                {day:'Thursday', opens: '11:00 AM', closes: '3:00 PM'},
                {day:'Friday', opens: '11:00 AM', closes: '3:00 PM'}
              ]
            },
          ],
          seasonal: false,
          phone: '1-555-555-5555',
          rating: 4,
          website: 'https://www.rit.edu'
        },
        {
          _id: '1',
          name: 'University of Rochester',
          description: 'The University of Rochester is a private, nonsectarian, research university in Rochester, New York. The university grants undergraduate and graduate degrees, including doctoral and professional degrees.',
          type: 'School',
          location: [43.130553, -77.626003],
          image: 'https://www.rochester.edu/college/psc/images/bg/background22.jpg',
          comments: [],
          dateCreated: '',
          flag: [],
          amenities: ["bike trail", "food and drink", "library"],
          schedule: [
            {
              days: [
                {day:'Sunday', opens: '9:00 AM', closes: '4:00 PM'},
                {day:'Monday', opens: '9:00 AM', closes: '10:00 PM'},
                {day:'Tuesday', opens: '9:00 AM', closes: '10:00 PM'},
                {day:'Wednesday', opens: '9:00 AM', closes: '6:00 PM'},
                {day:'Thursday', opens: '9:00 AM', closes: '10:00 PM'},
                {day:'Friday', opens: '9:00 AM', closes: '10:00 PM'},
                {day:'Saturday', opens: '9:00 AM', closes: '4:00 PM'}
              ]
            }
          ],
          phone: '1-555-555-5555',
          rating: 4,
          website: 'https://www.rochester.edu'
        }]
      };

  }

  componentDidMount() {
    let pouch = new ACPouch();
    pouch.getPoints().query('points/all_points', {
      include_docs: true
    }).then(result => {
      this.setState({services: pluck(result.rows, 'doc')});
    });
  }

  render() {
    const { marker } = this.props;
    let selectedPoint = this.state.services[0];
    if (marker.selectedMarker) {
      selectedPoint = marker.selectedMarker;
    }

    return (
      <div>
        <Layout fixedHeader>
          <Header title="Adventure Cycling" />
          <ACDrawer page="Map"/>
          <PointMap services={this.state.services} alerts={this.state.alerts}/>
          <HammerPointCard point={selectedPoint} show={marker.showPointCard}/>
        </Layout>
      </div>
    );
  }
}

function select(state) {
  return {
    marker: state.marker
  };
}

export default connect(select)(MapPage);
