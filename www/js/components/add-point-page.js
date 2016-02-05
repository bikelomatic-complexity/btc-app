import React, {Component} from 'react';

import * as leaflet from 'react-leaflet';
import { divIcon } from 'leaflet';

import { Layout, Header, Content, Button, Icon } from 'react-mdl';
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
      location, name, phoneNumber, type, website
    } = this.props.newPoint;

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
    }, undefined));
    this.props.history.push('/');

    // BlobUtil.imgSrcToBlob(imageSrc).then(blob => {
    //
    // });
  }

  render() {
    const { dispatch, newPoint } = this.props;
    const {
      address, amenities, description, hours,
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
        if (!((description) || (phoneNumber) || (address) || (website))) {
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

    const paddingStyle={padding:'5px 0px'}
    const buttonStyle={width:'20%'}

    return (
      <Layout fixedHeader>
        <Header title="Add New Point"/>
        <ACDrawer page="Add Point"/>
        <div className="form-column">
          <div style={paddingStyle}>
            <Button raised ripple
                    colored={currentPage===AddPointLocation}
                    style={buttonStyle}
                    onClick={()=>{this.props.history.push('/add-point');}}>
              <Icon name="place" />
            </Button>
            <Button raised ripple
                    colored={currentPage===AddPointName}
                    style={buttonStyle}
                    onClick={()=>{this.props.history.push('/add-point/name');}}>
              <Icon name="mode_edit"/>
            </Button>
            <Button raised ripple
                    disabled={disabled}
                    colored={currentPage===AddPointDescription}
                    style={buttonStyle}
                    onClick={()=>{this.props.history.push('/add-point/description');}}>
              <Icon name="format_align_left"/>
            </Button>
            <Button raised ripple
                    disabled={disabled}
                    colored={currentPage===AddPointHours}
                    style={buttonStyle}
                    onClick={()=>{this.props.history.push('/add-point/hours');}}>
              <Icon name="schedule" />
            </Button>
            <Button raised ripple
                    disabled={disabled}
                    colored={currentPage===AddPointAmenities}
                    style={buttonStyle}
                    onClick={()=>{this.props.history.push('/add-point/amenities');}}>
              <Icon name="local_bar" />
            </Button>
          </div>

          <div>
            {this.props.children}
          </div>

          <div className="form-row">
            <Button raised colored ripple
                    disabled={disabled && (currentPage!==AddPointLocation)}
                    onClick={onNext.bind(this)}>
              {nextText}
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
