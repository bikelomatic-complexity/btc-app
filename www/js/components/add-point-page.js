import React, {Component} from 'react';

import * as leaflet from 'react-leaflet';
import { divIcon } from 'leaflet';

import { Layout, Header, Content, Icon } from 'react-mdl';
import { RaisedButton, Tabs, Tab, FontIcon } from 'material-ui';

import ACDrawer from './ac-drawer';

import AddPointLocation from './add-point-location';
import AddPointName from './add-point-name';
import AddPointDescription from './add-point-description';
import AddPointHours from './add-point-hours';
import AddPointAmenities from './add-point-amenities';

import { userAddPoint } from '../reducers/points';
import { clearPointProps } from '../actions/new-point-actions';

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
    const { dispatch, newPoint } = this.props;
    const {
      address, amenities, description, hours, imageSrc,
      location, name, phoneNumber, type, website
    } = newPoint;
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
      <Layout fixedHeader>
        <Header title="Add New Point"/>
        <ACDrawer page="Add Point"/>
        <div className="form-column">
          <Tabs value={currentPage}>
            <Tab  value={AddPointLocation}
                  onClick={()=>{this.props.history.push('/add-point');}}
                  icon={<FontIcon className="material-icons">place</FontIcon>}/>
            <Tab  value={AddPointName}
                  onClick={()=>{this.props.history.push('/add-point/name');}}
                  icon={<FontIcon className="material-icons">mode_edit</FontIcon>}/>
            <Tab  value={AddPointDescription}
                  onClick={()=>{this.props.history.push('/add-point/description');}}
                  icon={<FontIcon className="material-icons">format_align_left</FontIcon>}/>
            <Tab  value={AddPointHours}
                  onClick={()=>{this.props.history.push('/add-point/hours');}}
                  icon={<FontIcon className="material-icons">schedule</FontIcon>}/>
            <Tab  value={AddPointAmenities}
                  onClick={()=>{this.props.history.push('/add-point/amenities');}}
                  icon={<FontIcon className="material-icons">local_bar</FontIcon>}/>
          </Tabs>

          <div>
            {this.props.children}
          </div>

          <div className="form-row">
            <RaisedButton secondary
                    disabled={disabled && (currentPage!==AddPointLocation)}
                    onClick={onNext.bind(this)}>
              {nextText}
            </RaisedButton>
          </div>
        </div>
      </Layout>
    );
  }
}

function select(state) {
  return {
    newPoint: state.newPoint
  };
}

export default connect(select)(AddPointPage);
