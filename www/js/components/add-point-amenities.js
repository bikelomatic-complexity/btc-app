import React, {Component} from 'react';
import { CardText, Button, Icon } from 'react-mdl';

// import redux components
import { connect } from 'react-redux';
import { types, displayType } from '../types'
import { addPointAmenity, removePointAmenity } from '../actions/new-point-actions';

export class AddPointAmenities extends Component {
  constructor(props){
    super(props);
    this.state = {
      amenity:'airport'
    };
  }

  addAmenity(){
    const { dispatch } = this.props;
    dispatch(addPointAmenity(this.state.amenity));
    this.forceUpdate();
  }

  removeAmenity(index){
    const { dispatch } = this.props;
    dispatch(removePointAmenity(index));
    this.forceUpdate();
  }

  selectAmenity(event){
    this.setState({
      amenity:event.target.value
    });
  }

  render() {
    const amenityOptions = types.map((amenity)=>{
      return (<option key={amenity} value={amenity}>
        {displayType(amenity)}
      </option>);
    });

    let addAmenityButton = (
      <Button colored
              onClick={this.addAmenity.bind(this)}>
        Add Amenity
      </Button>
    );
    if (this.props.newPoint.amenities && this.props.newPoint.amenities.includes(this.state.amenity)) {
      addAmenityButton = (
        <Button disabled colored> Add Amenity </Button>
      );
    }


    return (
      <div className="form-column">
        {this.props.newPoint.amenities.map((amenity, index)=>{
          return (
            <div key={amenity} className="form-row">
              <CardText style={{flex:'5'}}>{displayType(amenity)}</CardText>
              <Button raised accent onClick={this.removeAmenity.bind(this, index)}>
                <Icon name="clear" />
              </Button>
            </div>
          )
        })}
        <div className="form-row">
          <select className="mdl-button mdl-button--raised" onChange={this.selectAmenity.bind(this)}>
            { amenityOptions }
          </select>
          { addAmenityButton }
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

export default connect(select)(AddPointAmenities);
