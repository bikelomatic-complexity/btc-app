import React, {Component} from 'react';

import * as leaflet from 'react-leaflet';
import { divIcon } from 'leaflet';

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
  addPointAmenity, removePointAmenity, clearPointProps
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
            name, phoneNumber, type, website } = this.props.newPoint;

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
      location, name, phoneNumber, type, website
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

    return (
      <div className="form-column page-content">
        <Tabs value={currentPage}>
          <Tab  value={AddPointLocation}
                onClick={()=>{this.props.history.push('/add-point');}}
                icon={<FontIcon className="material-icons">place</FontIcon>}/>
          <Tab  value={AddPointName}
                onClick={()=>{this.props.history.push('/add-point/name');}}
                icon={<FontIcon className="material-icons">mode_edit</FontIcon>}/>
          <Tab  value={AddPointDescription} disabled={disabled}
                onClick={()=>{this.props.history.push('/add-point/description');}}
                icon={<FontIcon className="material-icons">format_align_left</FontIcon>}/>
          <Tab  value={AddPointHours} disabled={disabled}
                onClick={()=>{this.props.history.push('/add-point/hours');}}
                icon={<FontIcon className="material-icons">schedule</FontIcon>}/>
          <Tab  value={AddPointAmenities} disabled={disabled}
                onClick={()=>{this.props.history.push('/add-point/amenities');}}
                icon={<FontIcon className="material-icons">local_bar</FontIcon>}/>
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
