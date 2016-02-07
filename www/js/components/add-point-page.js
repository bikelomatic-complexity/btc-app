import React, {Component} from 'react';

import * as leaflet from 'react-leaflet';
import { divIcon } from 'leaflet';

import { Layout, Header, Content, Button } from 'react-mdl';
import ACDrawer from './ac-drawer';

import AddPointLocation from './add-point-location';
import AddPointName from './add-point-name';
import AddPointDescription from './add-point-description';
import AddPointHours from './add-point-hours';
import AddPointAmenities from './add-point-amenities';

import { userAddPoint } from '../reducers/points';

import BlobUtil from 'blob-util';

// import redux components
import { connect } from 'react-redux';

export class AddPointPage extends Component {

  onSubmit() {
    const {
      address, amenities, description, hours,
      location, name, phoneNumber, type, website } = this.props.newPoint;

    BlobUtil.imgSrcToBlob(imageSrc).then(blob => {
      this.props.dispatch(userAddPoint({
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
      this.props.history.push('/');
    });
  }

  render() {
    const { dispatch } = this.props;
    // determine next page, based on current page
    const currentPage = this.props.children.type;
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
        break;
      case AddPointHours:
        onNext = ()=> {this.props.history.push('/add-point/amenities');}
        break;
      case AddPointAmenities:
        onNext = this.onSubmit;
        break;
    }

    return (
      <Layout fixedHeader>
        <Header title="Add New Point"/>
        <ACDrawer page="Add Point"/>
        <div className="form-column">
          <div className="form-row">
            <Button raised ripple colored={currentPage===AddPointLocation}
              onClick={()=>{this.props.history.push('/add-point');}}>
              Location
            </Button>
            <Button raised ripple colored={currentPage===AddPointName}
              onClick={()=>{this.props.history.push('/add-point/name');}}>
              Name
            </Button>
            <Button raised ripple colored={currentPage===AddPointDescription}
              onClick={()=>{this.props.history.push('/add-point/description');}}>
              Description
            </Button>
            <Button raised ripple colored={currentPage===AddPointHours}
              onClick={()=>{this.props.history.push('/add-point/hours');}}>
              Hours
            </Button>
            <Button raised ripple colored={currentPage===AddPointAmenities}
              onClick={()=>{this.props.history.push('/add-point/amenities');}}>
              Amenities
            </Button>
          </div>

          <div>
            {this.props.children}
          </div>

          <div className="form-row">
            <Button raised colored ripple onClick={onNext.bind(this)}>
              Next
            </Button>
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
