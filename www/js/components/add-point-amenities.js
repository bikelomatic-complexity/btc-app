import React, {Component} from 'react';
import { CardText, Icon } from 'react-mdl';
import { RaisedButton } from 'material-ui';

// import redux components
import { connect } from 'react-redux';
import DropDown from './drop-down';
import { types, displayType } from '../types'
import { addPointAmenity, removePointAmenity } from '../actions/new-point-actions';

export class AddPointAmenities extends Component {
  constructor(props){
    super(props);
    this.state = {
      amenity:null
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
            <div key={amenity} className="form-row">
              <CardText style={{flex:'5'}}>{displayType(amenity)}</CardText>
              <RaisedButton primary onClick={this.removeAmenity.bind(this, index)}>
                <Icon name="clear" />
              </RaisedButton>
            </div>
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

function select(state) {
  return {
    newPoint: state.newPoint
  };
}

export default connect(select)(AddPointAmenities);
