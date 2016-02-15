import React, { Component } from 'react';
import { connect } from 'react-redux'

import { RaisedButton, Checkbox, FontIcon } from 'material-ui';

import DropDown from '../components/drop-down';

import { setFilters } from '../actions/map-actions';

import { types, displayType } from '../types';

class FilterPage extends Component {
  constructor(props) {
    super(props);
    const { activeFilters, openServices, hideAlert } = this.props.filters;

    const filters = types.filter(type =>{
      return !activeFilters.includes(type);
    }); // copy by value

    this.state = {
      filters,
      activeFilters,
      openServices,
      hideAlert
    };
  }

  componentDidMount() {
    const { setDrawer } = this.props;
    setDrawer('Filter');
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    const { activeFilters, openServices, hideAlert } = this.state;
    dispatch(setFilters({activeFilters, openServices, hideAlert}));
  }

  addFilter(service) {
    const activeFilters = this.state.activeFilters;
    const filters = this.state.filters;
    activeFilters.push(service);
    filters.splice(filters.indexOf(service),1);
    this.setState({activeFilters, filters});
  }

  updateFilter(index, service) {
    const { activeFilters, filters } = this.state;
    const oldFilter = activeFilters[index];
    filters.splice(filters.indexOf(service),1);
    activeFilters[index] = service;
    filters.push(oldFilter);
    filters.sort();
    this.setState({activeFilters});
  }

  removeFilter(index) {
    const { activeFilters, filters } = this.state;
    const service = activeFilters.splice(index,1)[0];
    filters.push(service);
    filters.sort();
    this.setState({activeFilters, filters});
  }

  clearFilters() {
    const filters = types.filter(type => type); // copy by value

    this.setState({
      filters,
      activeFilters:[],
      openServices:false,
      hideAlert:false
    });
  }

  toggleOpenServices() {
    this.setState({openServices:(!this.state.openServices)})
  }

  toggleAlert() {
    this.setState({hideAlert:(!this.state.hideAlert)})
  }

  onFilter(e) {
    e.preventDefault();

    this.props.history.pushState(null, '/');
  }

  render() {
    const filtersDropDowns = this.state.activeFilters.map(
      (filterService, index) => {
        return (
          <RaisedButton
            key={filterService}
            style={{margin:8}}
            onClick={this.removeFilter.bind(this, index)}
            label={displayType(filterService)}
            labelPosition="before"
            icon={<FontIcon className="material-icons">clear</FontIcon>}/>
        );
      }
    );

    return (
      <div className="page-content">

        { filtersDropDowns }

        <div>
          <DropDown
            className="form-row"
            text="Filter"
            options={this.state.filters}
            textTransform={displayType}
            onSelectFunction={this.addFilter.bind(this)}/>
        </div>

        <div className="form-row">
          <Checkbox
            label="Only Show Open Services"
            onCheck={this.toggleOpenServices.bind(this)}
            style={{marginBotton:16}}
            checked={this.state.openServices}
          />
        </div>

        <div className="form-row">
          <Checkbox
            label="Hide Alerts"
            onCheck={this.toggleAlert.bind(this)}
            style={{marginBotton:16}}
            checked={this.state.hideAlert}
          />
        </div>

        <div className="form-row">
          <RaisedButton
            onClick={this.clearFilters.bind(this)}
            label="Clear"/>

          <RaisedButton
            onClick={this.onFilter.bind(this)}
            secondary
            label="Filter"/>
        </div>

      </div>
    );
  }
}

function select(state) {
  return {
    filters: state.filters
  };
}
export default connect(select)(FilterPage);
