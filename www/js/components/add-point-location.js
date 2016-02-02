import React, {Component} from 'react';

import PointMap from './point-map';
import AddPointCard from './add-point-card';

import { setPointLocation } from '../actions/new-point-actions';
import { Layout, Button } from 'react-mdl';

// import redux components
import { connect } from 'react-redux';

export class AddPointLocation extends Component {

  constructor(props) {
    super(props);
  }

  updateLocation(leaflet){
    const { dispatch } = this.props;
    const { lat, lng } = leaflet.target.getCenter();
    dispatch(setPointLocation([lat, lng]))
  }

  onLocationSelect() {
    // switch the page
  }

  render() {
    const { location } = this.props.newPoint;
    const { services, alerts } = this.props;

    const styleShadow = {marginLeft: '4px', marginTop: '18px', width: '25px', height: '41px'}
    const styleMarker = {marginLeft: '0px', marginTop: '18px', height: '41px'}

    let text = 'Add Point Here';
    if (location.length !== 0) {
      text = 'Set New Location'
    }
    return (
      <Layout fixedHeader>
        <PointMap services={services}
                  alerts={alerts}
                  afterMoved={this.updateLocation.bind(this)}/>
        <div className="adding-point" style={{position:'fixed', top:'50%', right:'calc(50% - 12.5px)'}}>
          <img src="img/icons/marker-shadow.png" className="leaflet-marker-shadow" style={styleShadow}/>
          <img src="img/icons/marker-icon.png" className="marker" style={styleMarker}/>
        </div>
        <Button colored onClick={this.onLocationSelect.bind(this)}>
          { text }
        </Button>
      </Layout>
    )
  }
}

function select(state) {
  return {
    newPoint: state.newPoint,
    marker: state.marker,
    services: state.points,
    alerts: [],
    mapState: state.mapState
  };
}

export default connect(select)(AddPointLocation);
