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
/*eslint-enable no-unused-vars*/

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { userAddPoint } from '../reducers/points';
import { setPointProps, clearPointProps, updatePointProps } from '../actions/new-point-actions';

import * as pointActions from '../actions/new-point-actions';
import * as mapActions from '../actions/map-actions';
import * as drawerActions from '../reducers/drawer';

import BlobUtil from 'blob-util';
import _, { findIndex, assign, bindAll } from 'lodash';

import history from '../history';

const allTabs = {
  AddPointLocation: {
    value: AddPointLocation,
    icon: <PlaceIcon />,
    url: '/'
  },
  AddPointName: {
    value: AddPointName,
    icon: <EditIcon />,
    url: '/name'
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

const navigate = (tabSet, tab) => {
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
    const {address, amenities, description, hours, location, name, phoneNumber, type, website } = this.props.newPoint;

    this.props.userAddPoint( {
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
    }, blob );
    this.props.clearPointProps();

    history.push( '/' );
  }

  loadPoint( props ) {
    console.log('loadPoint');
    // set the current point (if we got it from a URL param)
    const {services, newPoint} = props;
    const {pointId} = props.params;
    if ( ( newPoint._id !== pointId )
        && ( pointId !== undefined )
        && ( services.length > 0 ) ) {
      console.log('good');
      const pointIndex = findIndex( services, point => {
        return point._id === pointId;
      } );
      const newPoint = services[ pointIndex ];
      this.props.setPointProps( newPoint );
    }
    if ( ( pointId === undefined ) && ( newPoint._id !== undefined ) ) {
      console.log('bad');
      this.props.clearPointProps();
    }
  }

  componentDidMount() {
    console.log('didmount');
    this.loadPoint( this.props );
  }

  componentWillReceiveProps( nextProps ) {
    console.log('willprops');
    this.loadPoint( nextProps );
  }

  onSubmit() {
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
    const { newPoint } = this.props;

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
    };
    const tabSet = newPoint._id ? updateTabs : addTabs;
    console.log('PARAMS PARAMS PARAMS');
    console.log(this.props.route);
    console.log(this.props.location);

    // The router will provide a single child based on the route
    const page = React.Children.only( this.props.children );

    const tabIndex = findIndex( tabSet.tabs, { value: page.type } );
    let onNext;
    if( tabIndex === tabSet.tabs.length - 1 ) {
      onNext = this.onSubmit;
    } else {
      onNext = navigate( tabSet, tabSet.tabs[ tabIndex + 1 ] );
    }

    // The page is being rendered twice? once *without* boundActions?
    const props = assign( {}, this.props, this.props.wizardActions, {
      onNext: onNext,
      persist: this.props.updatePointProps
    } );
    const pageWithProps = React.cloneElement( page, props );

    const tabs = tabSet.tabs.map( tab => (
      <Tab key={ tab.value }
        value={ tab.value }
        onClick={ navigate( tabSet, tab ) }
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

function mapStateToProps( state ) {
  return {
    newPoint: state.newPoint,
    mapState: state.mapState
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    // These actions will be available in `this.props`
    ...bindActionCreators( {
      setPointProps,
      clearPointProps,
      updatePointProps,
      userAddPoint
    }, dispatch),

    // These actions are meant for the selected tab and are available in
    // `this.props.wizardActions`
    wizardActions: bindActionCreators( {
      ...pointActions,
      ...mapActions,
      ...drawerActions
    }, dispatch)
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( AddPointPage );
