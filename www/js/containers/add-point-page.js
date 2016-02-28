import React, {Component} from 'react';

import * as leaflet from 'react-leaflet';
import { divIcon } from 'leaflet';

import { findIndex } from 'underscore';

import { RaisedButton, Tabs, Tab, FontIcon } from 'material-ui';

import AddPointLocation from '../components/add-point-location';
import AddPointName from '../components/add-point-name';
import AddPointDescription from '../components/add-point-description';
import AddPointHours from '../components/add-point-hours';
import AddPointAmenities from '../components/add-point-amenities';

import { userAddPoint } from '../reducers/points';
import { setPointName, setPointLocation, setPointType,
  setPointDescription, setPointAddress, setPointImage,
  setPointWebsite, setPointPhone, addPointHours, removePointHours,
  addPointAmenity, removePointAmenity, clearPointProps,
  setPointProps, setUpdate
} from '../actions/new-point-actions';

import {  fullscreenMarker, peekMarker, deselectMarker,
  selectMarker, setMapCenter, setGeoLocation,
  setMapZoom, setMapLoading } from '../actions/map-actions';

import BlobUtil from 'blob-util';

// import redux components
import { connect } from 'react-redux';

export class AddPointPage extends Component {

  addPoint(blob=undefined) {
    const { dispatch } = this.props;
    const { address, amenities, description, hours, location,
            name, phoneNumber, type, website, isUpdate } = this.props.newPoint;

    dispatch(userAddPoint({
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
      schedule: [{days:hours}],
      phone: phoneNumber,
      rating: 5,
      website,
    }, blob));
    dispatch(clearPointProps());
    this.props.history.push('/');
  }

  loadPoint(props) {
    // set the current point (if we got it from a URL param)
    const { dispatch, services, newPoint } = props;
    const { pointId } = props.params;
    if ((newPoint._id === undefined)
      && (pointId !== undefined)
      && (services.length > 0)) {
      const pointIndex = findIndex(services, point => {
        return point._id === pointId;
      });
      const newPoint = services[pointIndex];
      dispatch(setPointProps(newPoint));
    }
    if ((pointId === undefined) && (newPoint._id !== undefined)) {
      dispatch(clearPointProps());
    }
  }

  componentDidMount() {
    this.loadPoint(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadPoint(nextProps);
  }

  componentWillUnmount() {
    this.props.dispatch(clearPointProps());
  }

  onSubmit() {
    const { dispatch } = this.props;
    const { imageSrc } = this.props.newPoint;
    if (imageSrc === '') {
      this.addPoint();
    } else {
      BlobUtil.imgSrcToBlob(imageSrc).then(blob => {
        this.addPoint(blob);
      });
    }
  }

  render() {
    const { dispatch, setDrawer, setDialog, newPoint, tracks, settings, filters,
      marker, services, alerts, mapState } = this.props;
    const {
      address, amenities, description, hours, imageSrc,
      location, name, phoneNumber, type, website, isUpdate
    } = newPoint;

    // add props and actions so the component can dispatch actions
    const newPointChildren = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        setDrawer, setDialog, newPoint, marker, services, filters,
        alerts, mapState, tracks, settings,
        setPointName: newName => {
          dispatch(setPointName(newName));
        },
        setPointLocation: newLocation => {
          dispatch(setPointLocation(newLocation));
        },
        setPointType: newType => {
          dispatch(setPointType(newType));
        },
        setPointDescription: newDescription => {
          dispatch(setPointDescription(newDescription));
        },
        setPointAddress: newAddress => {
          dispatch(setPointAddress(newAddress));
        },
        setPointImage: newImage => {
          dispatch(setPointImage(newImage));
        },
        setPointWebsite: newWebsite => {
          dispatch(setPointWebsite(newWebsite));
        },
        setPointPhone: newPhone => {
          dispatch(setPointPhone(newPhone));
        },
        addPointHours: ({day, opens, closes}) => {
          dispatch(addPointHours({day, opens, closes}));
        },
        removePointHours: index => {
          dispatch(removePointHours(index));
        },
        addPointAmenity: newAmenity => {
          dispatch(addPointAmenity(newAmenity));
        },
        removePointAmenity: index => {
          dispatch(removePointAmenity(index));
        },
        clearPointProps: () => {
          dispatch(clearPointProps());
        },

        setMapCenter: coords => {
          dispatch(setMapCenter(coords));
        },
        setGeoLocation: coords => {
          dispatch(setGeoLocation(coords));
        },
        setMapZoom: zoom => {
          dispatch(setMapZoom(zoom));
        },
        setMapLoading: isLoading => {
          dispatch(setMapLoading(isLoading));
        }

      })
    });

    // determine next page, based on current page
    const currentPage = this.props.children.type;
    const disabled = !((name) && (type));
    let nextText = "Next";
    let onNext = ()=>{};
    switch (currentPage) {
      case AddPointLocation:
        onNext = ()=> {this.props.history.push('/add-point/name');}
        break;
      case AddPointName:
        onNext = ()=> {this.props.history.push('/add-point/description');}
        break;
      case AddPointDescription:
        onNext = ()=> {this.props.history.push('/add-point/hours');}
        if (!((description) || (phoneNumber) ||
              (address) || (website) || (imageSrc))) {
          nextText = "Skip";
        }
        break;
      case AddPointHours:
        onNext = ()=> {this.props.history.push('/add-point/amenities');}
        if (hours.length == 0) {
          nextText = "Skip";
        }
        break;
      case AddPointAmenities:
        onNext = this.onSubmit;
        nextText = "Submit";
        break;
    }

    const addTabs = [
      {
        value:AddPointLocation, icon: "place",
        onClick:()=>{this.props.history.push('/add-point');}
      },
      {
        value:AddPointName, icon: "mode_edit",
        onClick:()=>{this.props.history.push('/add-point/name');},
      },
      {
        value:AddPointDescription, icon: "format_align_left",
        onClick:()=>{this.props.history.push('/add-point/description');},
      },
      {
        value:AddPointHours, icon: "schedule",
        onClick:()=>{this.props.history.push('/add-point/hours');},
      },
      {
        value:AddPointAmenities, icon: "local_bar",
        onClick:()=>{this.props.history.push('/add-point/amenities');},
      }
    ];

    const urlId = encodeURIComponent(newPoint._id);

    const updateTabs = [
      {
        value:AddPointDescription, icon: "format_align_left",
        onClick:()=>{this.props.history.push(`/update-point/${urlId}`);},
      },
      {
        value:AddPointHours, icon: "schedule",
        onClick:()=>{this.props.history.push(`/update-point/${urlId}/hours`);},
      },
      {
        value:AddPointAmenities, icon: "local_bar",
        onClick:()=>{this.props.history.push(`/update-point/${urlId}/amenities`);},
      }
    ];

    const tabs = newPoint._id ? updateTabs : addTabs;

    return (
      <div className="form-column page-content">
        <Tabs value={currentPage}>
          {tabs.map((tab)=>{
            return (
              <Tab key={tab.value} value={tab.value} onClick={tab.onClick}
                icon={<FontIcon className="material-icons">{tab.icon}</FontIcon>}
              />);
            }
          )}
        </Tabs>

        <div>
          {newPointChildren}
        </div>

        <div className="form-row">
          <RaisedButton secondary
                  disabled={disabled && (currentPage!==AddPointLocation)}
                  onClick={onNext.bind(this)}
                  label={nextText}/>
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    newPoint: state.newPoint,
    marker: state.marker,
    services: state.points,
    alerts: [],
    mapState: state.mapState,
    tracks: state.tracks.toJS(),
    filters: state.filters,
    settings: state.settings.toJS(),
  };
}

export default connect(select)(AddPointPage);
