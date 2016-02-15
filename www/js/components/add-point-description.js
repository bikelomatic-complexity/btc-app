import React, {Component} from 'react';
import { RaisedButton, TextField } from 'material-ui';

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

  componentDidMount() {
    const { setDrawer } = this.props;
    setDrawer('Add Details');
  }

  onDescriptionUpdate(event) {
    const { setPointDescription } = this.props;
    const description = event.target.value;
    this.setState({description});
    setPointDescription(description);
  }

  onPhoneUpdate(event) {
    const { setPointPhone } = this.props;
    const phoneNumber = event.target.value;
    this.setState({phoneNumber});
    setPointPhone(phoneNumber);
  }

  onWebsiteUpdate(event) {
    const { setPointWebsite } = this.props;
    const website = event.target.value;
    this.setState({website});
    setPointWebsite(website);
  }

  onAddressUpdate(event) {
    const { setPointAddress } = this.props;
    const address = event.target.value;
    this.setState({address});
    setPointAddress(address);
  }

  onPhotoAdd() {
    const { setPointImage } = this.props;
    // This logic will not work on the browser
    // because of issue - Apache Cordova / CB-9852
    // https://issues.apache.org/jira/browse/CB-9852
    navigator.camera.getPicture(
      imageSrc => {
        this.setState({ imageSrc });
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

export default AddPointDescription;
