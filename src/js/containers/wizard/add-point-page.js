import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { serviceTypes } from 'btc-models/lib/schema/types';

import PointPage from './point-page';
import * as tabs from './tabs';
import { userAddPoint } from '../../reducers/points';

import history from '../../history';

export class AddPointPage extends PointPage {
  getPageUrl() {
    return '/add-point';
  }

  getTabSet() {
    return [
      tabs.PointLocationTab,
      tabs.PointNameTab,
      tabs.PointDescriptionTab,
      tabs.PointHoursTab,
      tabs.PointAmenitiesTab
    ];
  }

  onFinal( blob = undefined ) {
    const point = this.props.newPoint;
    this.props.userAddPoint( {
      'class': 'service',
      'created_at': new Date().toISOString(),
      'address': point.address,
      'name': point.name,
      'location': point.location,
      'type': point.type,
      'description': point.description,
      'flag': false,
      'amenities': point.amenities,
      'seasonal': false,
      'schedule': [ { days: point.hours } ],
      'phone': point.phoneNumber,
      'website': point.website,
      'rating': point.rating
    }, blob );

    history.push( '/' );
  }
}

function mapStateToProps( state ) {
  return {
    ...PointPage.mapStateToProps.apply( this, arguments ),
    mapState: state.mapState, // You need a map to place a service
    types: serviceTypes       // You need to select a service type
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    ...PointPage.mapDispatchToProps.apply( this, arguments ),
    ...bindActionCreators( {
      'userAddPoint': userAddPoint
    }, dispatch )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( AddPointPage );
