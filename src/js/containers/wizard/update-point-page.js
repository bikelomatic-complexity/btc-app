import PointPage from './point-page';
import * as tabs from './tabs';
import { Service, serviceTypes } from 'btc-models';
import { updateService } from '../../reducers/points';

import history from '../../history';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class UpdatePointPage extends PointPage {
  constructor(props) {
    super(props);
  }

  getPageUrl() {
    const { params } = this.props;
    const id = encodeURIComponent( params.id );
    return `/update-point/${ id }`;
  }

  getTabSet() {
    return [
      tabs.ServiceDescriptionTab,
      tabs.ServiceHoursTab,
      tabs.ServiceAmenitiesTab
    ];
  }

  // The update service page needs to get data to display upon mount.
  // We need to assume that we'll be asynchronously fetching that data.
  componentWillMount() {
    const { params, points } = this.props;
    this.setState( { point: points[ params.id ] || { isFetching: true } } );
  }

  // Upon mount, we need to load the service into the store, then set our
  // own state to match.
  componentDidMount() {
    const { pageActions, params } = this.props;
    pageActions.loadPoint( params.id )
  }

  // #componentWillReceiveProps
  // When the page mounted, we dispatched loadPoint. If it needed to
  // asynchronously fetch a point, the points prop will change. TODO: this
  // function might be called every time we use this.setState().
  componentWillReceiveProps( nextProps ) {
    if( this.state.point.isFetching ) {
      const { params, points } = nextProps;
      this.setState( { point: points[ params.id ] } );
    }
  }

  // The update service page is ready to display once we're done
  // asynchronously fetching.
  isReady() {
    return !this.state.point.isFetching;
  }

  onFinal() {
    const { updateService } = this.props;
    const { point, coverBlob } = this.state;

    const service = new Service( point );
    if( service.isValid() ) {
      updateService( service, coverBlob );
      history.push( '/' );
    } else {
      console.error( service.validationError )
    }
  }

  static mapStateToProps( state ) {
    return {
      ...super.mapStateToProps( state ),
      types: serviceTypes
    }
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
  UpdatePointPage.mapStateToProps,
  UpdatePointPage.mapDispatchToProps
)( UpdatePointPage );
