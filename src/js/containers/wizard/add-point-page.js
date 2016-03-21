import PointPage from './point-page';
import * as tabs from './tabs';

import history from '../../history';
import { addService } from '../../reducers/points';
import { Service, serviceTypes } from 'btc-models';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class AddPointPage extends PointPage {
  getPageUrl() {
    return '/add-point';
  }

  getTabSet() {
    return [
      tabs.PointLocationTab,
      tabs.ServiceNameTab,
      tabs.ServiceDescriptionTab,
      tabs.ServiceHoursTab,
      tabs.ServiceAmenitiesTab
    ];
  }

  onFinal( blob = undefined ) {
    const { addService, newPoint } = this.props;
    const point = newPoint;

    const service = new Service( {
      'name': point.name,
      'location': point.location,
      'type': point.type,
      'description': point.description,
      'flag': false,
      'amenities': point.amenities,
      'schedule': [ { days: point.hours } ],
      'seasonal': false,
      'address': point.address,
      'phone': point.phoneNumber,
      'website': point.website
    } );
    if( service.isValid() ) {
      addService( service, blob );
      history.push( '/' );
    } else {
      console.log( service.validationError );
    }
  }
}

function mapStateToProps( state ) {
  return {
    ...PointPage.mapStateToProps.apply( this, arguments ),
    mapState: state.mapState, // You need a map to place a service
    types: serviceTypes // You need to select a service type
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    ...PointPage.mapDispatchToProps.apply( this, arguments ),
    ...bindActionCreators( {
      'addService': addService
    }, dispatch )
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( AddPointPage );
