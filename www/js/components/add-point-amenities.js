/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { RaisedButton, CardText, FontIcon } from 'material-ui';

import DropDown from './drop-down';
/*eslint-disable no-unused-vars*/

import { types, displayType } from '../types';

export class AddPointAmenities extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      amenity: null
    };
  }

  componentDidMount() {
    const {setDrawer, newPoint} = this.props;
    setDrawer( newPoint._id ? 'Update Amenities' : 'Add Amenities' );
  }

  addAmenity() {
    const {addPointAmenity} = this.props;
    addPointAmenity( this.state.amenity );
  }

  removeAmenity( index ) {
    const {removePointAmenity} = this.props;
    removePointAmenity( index );
  }

  selectAmenity( amenity ) {
    this.setState( { amenity } );
  }

  render() {
    const amenityOptions = types.map( ( amenity ) => {
      return (<option key={ amenity }
                value={ amenity }>
                { displayType( amenity ) }
              </option>);
    } );

    let addAmenityButton = (
    <RaisedButton secondary
      disabled={ !( this.state.amenity || this.props.newPoint.amenities.indexOf( this.state.amenity ) !== -1 ) }
      onClick={ this.addAmenity.bind( this ) }
      label="Add Amenity" />
    );
    if ( this.props.newPoint.amenities && this.props.newPoint.amenities.indexOf( this.state.amenity ) !== -1 ) {
      addAmenityButton = (
        <RaisedButton secondary
          disabled
          label="Add Amenity" />
      );
    }

    const amenities = this.props.newPoint.amenities.map( ( amenity, index ) => {
      return (
        <RaisedButton key={ amenity }
          style={ { margin: 8 } }
          onClick={ this.removeAmenity.bind( this, amenity ) }
          label={ displayType( amenity ) }
          labelPosition="before"
          icon={ <FontIcon className="material-icons">
                   clear
                 </FontIcon> } />
        );
    } );

    return (
      <div className="form-column">
        <div className="form-row">
          <DropDown options={ types }
            text="Amenity"
            textTransform={ displayType }
            onSelectFunction={ this.selectAmenity.bind( this ) } />
          { addAmenityButton }
        </div>
        <div>
          { amenities }
        </div>
      </div>
      );
  }
}

export default AddPointAmenities;
