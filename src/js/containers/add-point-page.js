/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { RaisedButton, Tabs, Tab, FontIcon } from 'material-ui';

import AddPointLocation from '../components/wizard/add-point-location';
import AddPointName from '../components/wizard/add-point-name';
import AddPointDescription from '../components/wizard/add-point-description';
import AddPointHours from '../components/wizard/add-point-hours';
import AddPointAmenities from '../components/wizard/add-point-amenities';

import PlaceIcon from 'material-ui/lib/svg-icons/maps/place';
import EditIcon from 'material-ui/lib/svg-icons/image/edit';
import FormatAlignLeftIcon from 'material-ui/lib/svg-icons/editor/format-align-left';
import ScheduleIcon from 'material-ui/lib/svg-icons/action/schedule';
import LocalBarIcon from 'material-ui/lib/svg-icons/maps/local-bar';
/*eslint-enabled no-unused-vars*/

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as leaflet from 'react-leaflet';
import { divIcon } from 'leaflet';

import { userAddPoint } from '../reducers/points';
import { setPointName, setPointLocation, setPointType, setPointDescription, setPointAddress, setPointImage, setPointWebsite, setPointPhone, addPointHours, removePointHours, addPointAmenity, removePointAmenity, clearPointProps, setPointProps } from '../actions/new-point-actions';

import { fullscreenMarker, peekMarker, deselectMarker, selectMarker, setMapCenter, setGeoLocation, setMapZoom, setMapLoading } from '../actions/map-actions';

import * as pointActions from '../actions/new-point-actions';
import * as mapActions from '../actions/map-actions';

import BlobUtil from 'blob-util';
import _, { findIndex, noop, assign, bindAll } from 'lodash';

const allTabs = {
  AddPointLocation: {
    value: AddPointLocation,
    icon: <PlaceIcon />,
    url: '/'
  },
  AddPointName: {
    value: AddPointName,
    icon: <EditIcon />,
    url: '/name',
  },
  AddPointDescription: {
    value: AddPointDescription,
    icon: <FormatAlignLeftIcon />,
    url: '/description'
  },
  AddPointHours: {
    value: AddPointHours,
    icon: <ScheduleIcon />,
    url: '/hours'
  },
  AddPointAmenities: {
    value: AddPointAmenities,
    icon: <LocalBarIcon />,
    url: '/amenities'
  }
};

const navigate = (history, tabSet, tab) => {
  return () => {
    history.push( tabSet.baseUrl + tab.url );
  };
};

export class AddPointPage extends Component {
  constructor(props) {
    super(props);
    bindAll(this, 'onSubmit', 'loadPoint');
  }
  addPoint( blob = undefined ) {
    const {dispatch} = this.props;
    const {address, amenities, description, hours, location, name, phoneNumber, type, website, isUpdate} = this.props.newPoint;

    dispatch( userAddPoint( {
      class: 'service',
      created_at: new Date().toISOString(),
      address,
      name,
      location,
      type,
      description,
      flag: false,
      amenities,
      seasonal: false,
      schedule: [ { days: hours } ],
      phone: phoneNumber,
      website,
      rating: 5
    }, blob ) );
    dispatch( clearPointProps() );
    this.props.history.push( '/' );
  }

  loadPoint( props ) {
    // set the current point (if we got it from a URL param)
    const {dispatch, services, newPoint} = props;
    const {pointId} = props.params;
    if ( ( newPoint._id !== pointId )
        && ( pointId !== undefined )
        && ( services.length > 0 ) ) {
      const pointIndex = findIndex( services, point => {
        return point._id === pointId;
      } );
      const newPoint = services[ pointIndex ];
      dispatch( setPointProps( newPoint ) );
    }
    if ( ( pointId === undefined ) && ( newPoint._id !== undefined ) ) {
      dispatch( clearPointProps() );
    }
  }

  componentDidMount() {
    this.loadPoint( this.props );
  }

  componentWillReceiveProps( nextProps ) {
    this.loadPoint( nextProps );
  }

  onSubmit() {
    const {dispatch} = this.props;
    const {imageSrc} = this.props.newPoint;
    if ( imageSrc === '' ) {
      this.addPoint();
    } else {
      BlobUtil.imgSrcToBlob( imageSrc ).then( blob => {
        this.addPoint( blob );
      } );
    }
  }

  render() {
    const { dispatch, newPoint, setDrawer, history } = this.props;

    const addTabs = {
      baseUrl: '/add-point',
      tabs: [
        allTabs.AddPointLocation,
        allTabs.AddPointName,
        allTabs.AddPointDescription,
        allTabs.AddPointHours,
        allTabs.AddPointAmenities
      ]
    };
    const updateTabs = {
      baseUrl: '/update-point/' + encodeURIComponent( newPoint._id ),
      tabs: [
        allTabs.AddPointDescription,
        allTabs.AddPointHours,
        allTabs.AddPointAmenities
      ]
    }
    const tabSet = newPoint._id ? updateTabs : addTabs;

    // The router will provide a single child based on the route
    const page = React.Children.only( this.props.children );

    const tabIndex = findIndex( tabSet.tabs, { value: page.type } );
    let onNext;
    if( tabIndex === tabSet.tabs.length - 1 ) {
      onNext = this.onSubmit;
    } else {
      onNext = navigate( history, tabSet, tabSet.tabs[ tabIndex + 1 ] );
    }

    const actions = _.chain()
      .assign( {}, pointActions, mapActions )
      .omit( 'default' )
      .value();
    const boundActions = bindActionCreators(actions, dispatch);

    // The page is being rendered twice? once *without* boundActions?
    const props = assign( {}, this.props, boundActions, { onNext } );
    const pageWithProps = React.cloneElement( page, props );

    const tabs = tabSet.tabs.map( tab => (
      <Tab key={ tab.value }
        value={ tab.value }
        onClick={ navigate( history, tabSet, tab ) }
        icon={ tab.icon } />
    ) );

    return (
      <div className='form-column page-content'>
        <Tabs value={ page.type }>
          { tabs }
        </Tabs>
        <div>
          { pageWithProps }
        </div>
      </div>
    );
  }
}

function select( state ) {
  return {
    newPoint: state.newPoint,
    marker: state.marker,
    services: state.points,
    alerts: [],
    mapState: state.mapState,
    tracks: state.tracks.toJS(),
    filters: state.filters,
    settings: state.settings.toJS()
  };
}

export default connect( select )( AddPointPage );
