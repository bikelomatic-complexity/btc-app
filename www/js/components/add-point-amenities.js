import React, {Component} from 'react';
import { RaisedButton, CardText, FontIcon } from 'material-ui';

import DropDown from './drop-down';
import { types, displayType } from '../types'

export class AddPointAmenities extends Component {
  constructor(props){
    super(props);
    this.state = {
      amenity:null
    };
  }

  componentDidMount() {
    const { setDrawer } = this.props;
    setDrawer('Add Amenities');
  }

  addAmenity(){
    const { addPointAmenity } = this.props;
    addPointAmenity(this.state.amenity);
  }

  removeAmenity(index){
    const { removePointAmenity } = this.props;
    removePointAmenity(index);
  }

  selectAmenity(amenity){
    this.setState({amenity});
  }

  render() {
    const amenityOptions = types.map((amenity)=>{
      return (<option key={amenity} value={amenity}>
        {displayType(amenity)}
      </option>);
    });

    let addAmenityButton = (
      <RaisedButton secondary
              disabled={!(this.state.amenity || this.props.newPoint.amenities.includes(this.state.amenity))}
              onClick={this.addAmenity.bind(this)}>
        Add Amenity
      </RaisedButton>
    );
    if (this.props.newPoint.amenities && this.props.newPoint.amenities.includes(this.state.amenity)) {
      addAmenityButton = (
        <RaisedButton secondary disabled> Add Amenity </RaisedButton>
      );
    }


    return (
      <div className="form-column">
        {this.props.newPoint.amenities.map((amenity, index)=>{
          return (
            <RaisedButton
              key={amenity}
              style={{margin:8}}
              onClick={this.removeAmenity.bind(this, amenity)}
              label={displayType(amenity)}
              labelPosition="before"
              icon={<FontIcon className="material-icons">clear</FontIcon>}/>
          )
        })}
        <div className="form-row">
          <DropDown options={types}
                    text={"Amenity"}
                    textTransform={displayType}
                    onSelectFunction={this.selectAmenity.bind(this)}/>
          { addAmenityButton }
        </div>
      </div>
    )
  }
}

export default AddPointAmenities;
