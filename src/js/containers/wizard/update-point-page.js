import PointPage from './point-page';
import * as tabs from './tabs';
import { Service } from 'btc-models';
import { updateService } from '../../reducers/points';

import history from '../../history';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class UpdatePointPage extends PointPage {
  constructor(props) {
    super(props);
  }

  getPageUrl() {
    const {_id} = this.props.newPoint;
    const id = encodeURIComponent( _id );

    return `/update-point/${id}`;
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
    this.setState( { point: { isFetching: true } } );
  }

  // Upon mount, we need to load the service into the store, then set our
  // own state to match.
  componentDidMount() {
    const { pageActions, params, points } = this.props;

    pageActions.loadPoint( params.id ).then( () => {
      this.setState( { point: points[ params.id ] } );
    });
  }

  // The update service page is ready to display once we're done
  // asynchronously fetching.
  isReady() {
    return !this.state.point.isFetching;
  }

  onFinal( point, blob = undefined ) {
    const { updateService } = this.props;

    const service = new Service( point );
    if( service.isValid() ) {
      updateService( service, blob );
      history.push( '/' );
    } else {
      console.error( service.validationError )
    }
  }

  static mapDispatchToProps( dispatch ) {
    return {
      ...super.mapDispatchToProps( dispatch ),
      ...bindActionCreators( {
        'updateService': updateService
      } )
    };
  }
}

export default connect(
  UpdatePointPage.mapStateToProps,
  UpdatePointPage.mapDispatchToProps
)( UpdatePointPage );
