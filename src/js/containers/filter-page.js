/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { RaisedButton, Checkbox, FontIcon } from 'material-ui';
import DropDown from '../components/drop-down';
import { Page } from '../components/page';
/*eslint-enable no-unused-vars*/

import { includes, assign, keys } from 'lodash';
import { connect } from 'react-redux';
import { display, serviceTypes, alertTypes } from 'btc-models';

import { setFilters } from '../reducers/filter';
import { setDrawer } from '../reducers/btc-drawer';

import history from '../history';

const allTypes = keys( assign( {}, serviceTypes, alertTypes ) );

class FilterPage extends Component {
  constructor( props ) {
    super( props );
    const {activeFilters, openServices, hideAlert} = this.props.filters;

    const filters = allTypes.filter( type => {
      return !includes( activeFilters, type );
    } ); // copy by value

    this.state = { filters, activeFilters, openServices, hideAlert };
  }

  componentDidMount() {
    this.props.dispatch( setDrawer( 'Filter' ) );
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    const {activeFilters, openServices, hideAlert} = this.state;
    dispatch( setFilters( { activeFilters, openServices, hideAlert } ) );
  }

  addFilter( service ) {
    const activeFilters = this.state.activeFilters;
    const filters = this.state.filters;
    activeFilters.push( service );
    filters.splice( filters.indexOf( service ), 1 );
    this.setState( { activeFilters, filters } );
  }

  updateFilter( index, service ) {
    const {activeFilters, filters} = this.state;
    const oldFilter = activeFilters[ index ];
    filters.splice( filters.indexOf( service ), 1 );
    activeFilters[ index ] = service;
    filters.push( oldFilter );
    filters.sort();
    this.setState( { activeFilters } );
  }

  removeFilter( index ) {
    const {activeFilters, filters} = this.state;
    const service = activeFilters.splice( index, 1 )[ 0 ];
    filters.push( service );
    filters.sort();
    this.setState( { activeFilters, filters } );
  }

  clearFilters() {
    const filters = [ ...allTypes ];

    this.setState( {
      filters,
      activeFilters: [],
      openServices: false,
      hideAlert: false
    } );
  }

  toggleOpenServices() {
    this.setState( { openServices: ( !this.state.openServices ) } );
  }

  toggleAlert() {
    this.setState( { hideAlert: ( !this.state.hideAlert ) } );
  }

  onFilter( e ) {
    e.preventDefault();
    history.push( '/' );
  }

  render() {
    const buttonStyles = [ {
      width: 'calc(50% - 15px)',
      margin: '10px 5px 0px 10px'
    }, {
      width: 'calc(50% - 15px)',
      margin: '5px 10px 0px 5px'
    } ];

    const filtersDropDowns = this.state.activeFilters.map(
      ( filterService, index ) => {
        return (
          <RaisedButton key={ filterService }
            style={ { margin: 8 } }
            onTouchTap={ this.removeFilter.bind( this, index ) }
            label={ display( filterService ) }
            labelPosition="before"
            icon={ <FontIcon className="material-icons">clear</FontIcon> } />
          );
      }
    );

    return (
      <Page className="layout__section">
        <div>
          <div className="form-row">
            <RaisedButton style={ buttonStyles[ 0 ] }
              onTouchTap={ this.clearFilters.bind( this ) }
              label="Clear" />
            <RaisedButton style={ buttonStyles[ 1 ] }
              onTouchTap={ this.onFilter.bind( this ) }
              secondary
              label="Filter" />
          </div>
          <div>
            <DropDown className="form-row"
              text="Filter"
              options={ this.state.filters }
              textTransform={ display }
              onSelectFunction={ this.addFilter.bind( this ) } />
          </div>
          <div className="form-row">
            <Checkbox label="Only Show Open Services"
              onCheck={ this.toggleOpenServices.bind( this ) }
              style={ { marginBottom: 16 } }
              checked={ this.state.openServices } />
          </div>
          <div className="form-row">
            <Checkbox label="Hide Alerts"
              onCheck={ this.toggleAlert.bind( this ) }
              style={ { marginBottom: 16 } }
              checked={ this.state.hideAlert } />
          </div>
          { filtersDropDowns }
        </div>
      </Page>
      );
  }
}

function select( state ) {
  return {
    filters: state.filters
  };
}
export default connect( select )( FilterPage );
