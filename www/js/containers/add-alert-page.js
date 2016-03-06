import React, {Component} from 'react';

import * as leaflet from 'react-leaflet';
import { divIcon } from 'leaflet';

import { findIndex } from 'underscore';

import { RaisedButton, Tabs, Tab, FontIcon } from 'material-ui';

import AddPointLocation from '../components/add-point-location';
import AddAlertDetails from '../components/add-alert-details';

import { userAddPoint } from '../reducers/points';
import { setPointName, setPointLocation, setPointType,
  setPointDescription, setPointImage, clearPointProps,
} from '../actions/new-point-actions';

import {  fullscreenMarker, peekMarker, deselectMarker,
  selectMarker, setMapCenter, setGeoLocation,
  setMapZoom, setMapLoading } from '../actions/map-actions';

import BlobUtil from 'blob-util';

// import redux components
import { connect } from 'react-redux';

export class AddAlertPage extends Component {

  addPoint(blob=undefined) {
    const { dispatch } = this.props;
    const { description, hours, location, name } = this.props.newPoint;

    dispatch(userAddPoint({
      class: 'service',
      created_at: new Date().toISOString(),
      name,
      location,
      type: "alert",
      description,
      flag: false
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
      location, name, phoneNumber, type, website, isUpdate
    } = newPoint;

    // add props and actions so the component can dispatch actions
    const newAlertChildren = React.Children.map(this.props.children, child => {
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

    const tabs = [
      {
        value:AddPointLocation, icon: "place",
        onClick:()=>{this.props.history.push('/add-alert');}
      },
      {
        value:AddAlertDetails, icon: "mode_edit",
        onClick:()=>{this.props.history.push('/add-alert/details');},
      }
    ];

    // determine next page, based on current page
    const currentPage = this.props.children.type;
    let nextText = "Next";
    let onNext = ()=>{};
    switch (currentPage) {
      case AddPointLocation:
        onNext = ()=> {this.props.history.push('/add-alert/details');}
        break;
      case AddAlertDetails:
        onNext = this.onSubmit;
        nextText = "Submit";
        break;
    }

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
          {newAlertChildren}
        </div>

        <div className="form-row">
          <RaisedButton secondary
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

export default connect(select)(AddAlertPage);
