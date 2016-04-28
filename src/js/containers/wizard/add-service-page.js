import PointPage from './point-page';
import * as tabs from './tabs';

import history from '../../history';
import { addService } from '../../reducers/points';
import { Service, serviceTypes } from 'btc-models';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class AddServicePage extends PointPage {
  getPageUrl() {
    return 'add-service';
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

  // Get the defaults for a service
  componentWillMount() {
    const service = new Service();
    this.setState( { point: service.store() } );
  }

  // The defaults are obtained synchronously, we are ready right now.
  isReady() {
    return true;
  }

  isPointValid() {
    const {point} = this.state;
    const service = new Service( point );
    return {
      valid: service.isValid(),
      validationErrors: service.validationError
    };
  }

  onFinal() {
    const {addService} = this.props;
    const {point, coverBlob} = this.state;

    const service = new Service( point );
    if ( service.isValid() ) {
      addService( service, coverBlob );
      history.push( '/' );
    } else {
      console.error( service.validationError );
    }
  }

  static mapStateToProps( state ) {
    return {
      ...super.mapStateToProps( state ),
      map: state.map, // You need a map to place a service
      types: serviceTypes // You need to select a service type
    };
  }

  static mapDispatchToProps( dispatch ) {
    return {
      ...super.mapDispatchToProps( dispatch ),
      ...bindActionCreators( {
        'addService': addService
      }, dispatch )
    };
  }
}

export default connect(
  AddServicePage.mapStateToProps,
  AddServicePage.mapDispatchToProps
)( AddServicePage );
