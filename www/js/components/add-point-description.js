import React, {Component} from 'react';
import { RaisedButton, TextField } from 'material-ui';

export class AddPointDescription extends Component {

  componentWillReceiveProps(nextProps) {
    const { setDrawer, newPoint } = nextProps;
    setDrawer(newPoint._id ? 'Update Details' : 'Add Details');
  }

  onDescriptionUpdate(event) {
    const { setPointDescription } = this.props;
    const description = event.target.value;
    setPointDescription(description);
  }

  onPhoneUpdate(event) {
    const { setPointPhone } = this.props;
    const phoneNumber = event.target.value;
    setPointPhone(phoneNumber);
  }

  onWebsiteUpdate(event) {
    const { setPointWebsite } = this.props;
    const website = event.target.value;
    setPointWebsite(website);
  }

  onAddressUpdate(event) {
    const { setPointAddress } = this.props;
    const address = event.target.value;
    setPointAddress(address);
  }

  onPhotoAdd() {
    const { setPointImage } = this.props;
    // This logic will not work on the browser
    // because of issue - Apache Cordova / CB-9852
    // https://issues.apache.org/jira/browse/CB-9852
    navigator.camera.getPicture(
      imageSrc => {
        setPointImage(imageSrc);
      },
      err => console.error( err ),
      { sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType:navigator.camera.DestinationType.FILE_URI,
        encodingType:navigator.camera.EncodingType.PNG
      }
    )
  }

  render() {
    const { description, phoneNumber,
      address, website, imageSrc } = this.props.newPoint;

    let imgView = <div />
    if (imageSrc !== '') {
      imgView = <div>
        <img src={imageSrc} width="100%" />
      </div>
    }

    if((this.props.newPoint._id === undefined)
      && (this.props.params.pointId !== undefined)) {
        return <div/>;
    }

    return (
      <div className="form-column">
        <div className="form-row">
          <TextField  rows={3} floatingLabelText="Description"
                      onBlur={this.onDescriptionUpdate.bind(this)}
                      defaultValue={description} />
        </div>
        <div className="form-row">
          <TextField  floatingLabelText="Phone Number"
                      type="tel"
                      onBlur={this.onPhoneUpdate.bind(this)}
                      defaultValue={phoneNumber} />
        </div>
        <div className="form-row">
          <TextField  floatingLabelText="Address"
                      onBlur={this.onAddressUpdate.bind(this)}
                      defaultValue={address} />
        </div>
        <div className="form-row">
          <TextField  floatingLabelText="Website"
                      type="url"
                      onBlur={this.onWebsiteUpdate.bind(this)}
                      defaultValue={website} />
        </div>
        <div className="form-row">
          { imgView }
        </div>
        <div className="form-row">
          <RaisedButton
            secondary
            onClick={this.onPhotoAdd.bind(this)}
            label="Upload Photo"/>
        </div>
      </div>
    )
  }
}

export default AddPointDescription;
