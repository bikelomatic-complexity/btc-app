import React, {Component} from 'react';
import { RaisedButton, TextField } from 'material-ui';

import {
  setPointDescription,
  setPointAddress,
  setPointWebsite,
  setPointPhone,
  setPointImage,
  clearPointProps
 } from '../actions/new-point-actions';

// import redux components
import { connect } from 'react-redux';

export class AddPointDescription extends Component {
  constructor(props) {
    super(props);

    const { description, phoneNumber, address,
            website, imageSrc } = this.props.newPoint;
    this.state = {
      description,
      phoneNumber,
      address,
      website,
      imageSrc
    };
  }

  onDescriptionUpdate(event) {
    const { dispatch } = this.props;
    const description = event.target.value;
    this.setState({description});
    dispatch(setPointDescription(description));
  }

  onPhoneUpdate(event) {
    const { dispatch } = this.props;
    const phoneNumber = event.target.value;
    this.setState({phoneNumber});
    dispatch(setPointPhone(phoneNumber));
  }

  onWebsiteUpdate(event) {
    const { dispatch } = this.props;
    const website = event.target.value;
    this.setState({website});
    dispatch(setPointWebsite(website));
  }

  onAddressUpdate(event) {
    const { dispatch } = this.props;
    const address = event.target.value;
    this.setState({address});
    dispatch(setPointAddress(address));
  }

  onPhotoAdd() {
    const { dispatch } = this.props;
    // This logic will not work on the browser
    // because of issue - Apache Cordova / CB-9852
    // https://issues.apache.org/jira/browse/CB-9852
    navigator.camera.getPicture(
      imageSrc => {
        this.setState({ imageSrc });
        dispatch(setPointImage(imageSrc));
      },
      err => console.error( err ),
      { sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType:navigator.camera.DestinationType.FILE_URI,
        encodingType:navigator.camera.EncodingType.PNG
      }
    )
  }

  render() {
    let imgView = <div />
    if (this.state.imageSrc !== '') {
      imgView = <div>
        <img src={this.state.imageSrc} width="100%" />
      </div>
    }

    return (
      <div className="form-column">
        <div className="form-row">
          <TextField  rows={3} floatingLabelText="Description"
                      onChange={this.onDescriptionUpdate.bind(this)}
                      value={this.state.description} />
        </div>
        <div className="form-row">
          <TextField  floatingLabelText="Phone Number"
                      type="tel"
                      onChange={this.onPhoneUpdate.bind(this)}
                      value={this.state.phoneNumber} />
        </div>
        <div className="form-row">
          <TextField  floatingLabelText="Address"
                      onChange={this.onAddressUpdate.bind(this)}
                      value={this.state.address} />
        </div>
        <div className="form-row">
          <TextField  floatingLabelText="Website"
                      type="url"
                      onChange={this.onWebsiteUpdate.bind(this)}
                      value={this.state.website} />
        </div>
        <div className="form-row">
          { imgView }
        </div>
        <div className="form-row">
          <RaisedButton secondary onClick={this.onPhotoAdd.bind(this)}>
                  Upload Photo
          </RaisedButton>
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    newPoint: state.newPoint
  };
}

export default connect(select)(AddPointDescription);
