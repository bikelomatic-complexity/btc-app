import PointPage from './point-page';
import * as tabs from './tabs';
import { Service, serviceTypes } from 'btc-models';
import { updateService } from '../../reducers/points';

import history from '../../history';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class UpdateServicePage extends PointPage {
  getPageUrl() {
    const id = encodeURIComponent( this.props.params.id );
    return `update-service/${ id }`;
  }

  getTabSet() {
    return [
      tabs.ServiceDescriptionTab,
      tabs.ServiceHoursTab,
      tabs.ServiceAmenitiesTab
    ];
  }

  // Try to get our point from the cache, then assume it's fetching.
  componentWillMount() {
    const {params, points} = this.props;
    this.setState( { point: points[ params.id ] || { isFetching: true } } );
  }

  // Once the component mounts, load the point into the store.
  componentDidMount() {
    const {pageActions, params} = this.props;
    pageActions.loadPoint( params.id );
  }

  // If we were fetching our point and it has arrived, set it in state.
  componentWillReceiveProps( nextProps ) {
    if ( this.state.point.isFetching ) {
      const {params, points} = nextProps;
      this.setState( { point: points[ params.id ] } );
    }
  }

  // We're only ready once the point is done fetching.
  isReady() {
    return !this.state.point.isFetching;
  }

  // # onFinal
  // Before calling `updateService`, transfer our original coverUrl to the
  // new service in case we don't have a new one to attach.
  onFinal() {
    const {updateService} = this.props;
    const {point, coverBlob} = this.state;

    const service = new Service( point );
    service.coverUrl = point.coverUrl;
    if ( service.isValid() ) {
      updateService( service, coverBlob );
      history.push( '/' );
    } else {
      console.error( service.validationError );
    }
  }

  static mapStateToProps( state ) {
    return {
      ...super.mapStateToProps( state ),
      types: serviceTypes
    };
  }

  static mapDispatchToProps( dispatch ) {
    return {
      ...super.mapDispatchToProps( dispatch ),
      ...bindActionCreators( {
        'updateService': updateService
      }, dispatch )
    };
  }
}

export default connect(
  UpdateServicePage.mapStateToProps,
  UpdateServicePage.mapDispatchToProps
)( UpdateServicePage );
