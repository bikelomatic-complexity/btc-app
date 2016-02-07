import React, {Component} from 'react';

import PointMap from './point-map';
import AddPointCard from './add-point-card';

import { setPointLocation } from '../actions/new-point-actions';
import { Layout } from 'react-mdl';

// import redux components
import { connect } from 'react-redux';

export class AddPointLocation extends Component {

  constructor(props) {
    super(props);
  }

  updateLocation(leaflet){
    const { dispatch } = this.props;
    const { lat, lng } = leaflet.target.getCenter();
    dispatch(setPointLocation([lat, lng]));
    this.forceUpdate();
  }

  updateLocationCoords(coords){
    const { dispatch } = this.props;
    dispatch(setPointLocation(coords));
    this.forceUpdate();
  }

  componentDidMount() {
    const { dispatch, mapState } = this.props;
    dispatch(setPointLocation(mapState.center))
  }

  render() {
    const { location } = this.props.newPoint;
    const { services, alerts } = this.props;

    const styleShadow = {marginLeft: '4px', marginTop: '18px', width: '25px', height: '41px'};
    const styleMarker = {marginLeft: '0px', marginTop: '18px', height: '41px'};

    const layoutStyle = {position: 'absolute', width: '100%', height: 'calc(100% - 0px)'};

    return (
      <div className="hideZoomControl"
           style={layoutStyle}>
        <PointMap services={services}
                  alerts={alerts}
                  getCenterOnLoad={this.updateLocationCoords.bind(this)}
                  afterMoved={this.updateLocation.bind(this)}/>
        <div className="adding-point" style={{position:'fixed', top:'calc(50% + 55px)', right:'calc(50% - 12.5px)'}}>
          <img src="img/icons/marker-shadow.png" className="leaflet-marker-shadow" style={styleShadow}/>
          <img src="img/icons/marker-icon.png" className="marker" style={styleMarker}/>
        </div>
      </div>
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
