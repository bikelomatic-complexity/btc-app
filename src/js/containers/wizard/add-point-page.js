import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PointPage from './point-page';
import * as tabs from './tabs';
import { userAddPoint } from '../../reducers/points';
import { clearPointProps } from '../../actions/new-point-actions';
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

    this.props.clearPointProps();
    history.push( '/' );
  }
}

function mapStateToProps( state ) {
  return {
    ...PointPage.mapStateToProps.apply( this, arguments ),
    mapState: state.mapState
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    ...PointPage.mapDispatchToProps.apply( this, arguments ),
    ...bindActionCreators( {
      'userAddPoint': userAddPoint,
      'clearPointProps': clearPointProps
    }, dispatch )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( AddPointPage );
