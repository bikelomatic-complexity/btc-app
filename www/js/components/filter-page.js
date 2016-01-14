import React, {Component} from 'react';

import { Layout, Header, CardText, Textfield, Button } from 'react-mdl';

import ACDrawer from './ac-drawer';
import DropDown from './drop-down';
import FilterDropDown from './filter-drop-down';

class FilterPage extends Component {
  constructor(props) {
    super(props);
    const filters = [
      'bar', 'bed & breakfast', 'bike shop', 'campground',
      'convenience store', 'cyclists camping', 'cyclists lodging',
      'grocery', 'hostel', 'hotel/motel', 'library', 'rest area',
      'restroom', 'restaurant', 'state park', 'museum', 'information',
      'airport', 'scenic area', 'hot spring', 'outdoor store',
      'cabin', 'other'
    ].sort();
    this.state = {filters, activeFilters:[], open:false, alert:false, showOptions: false};
  }

  addFilter(service) {
    const activeFilters = this.state.activeFilters;
    const filters = this.state.filters;
    activeFilters.push(service);
    filters.splice(filters.indexOf(service),1);
    this.setState({activeFilters, filters});
    this.toggleOptions();
  }

  updateFilter(index, service) {
    const activeFilters = this.state.activeFilters;
    activeFilters[index] = service;
    this.setState({activeFilters});
  }

  removeFilter(index) {
    const activeFilters = this.state.activeFilters;
    const filters = this.state.filters;
    const service = activeFilters.splice(index,1);
    filters.push(service);
    filters.sort();
    this.setState({activeFilters, filters});
  }

  clearFilters() {
    const filters = [
      'bar', 'bed & breakfast', 'bike shop', 'campground',
      'convenience store', 'cyclists camping', 'cyclists lodging',
      'grocery', 'hostel', 'hotel/motel', 'library', 'rest area',
      'restroom', 'restaurant', 'state park', 'museum', 'information',
      'airport', 'scenic area', 'hot spring', 'outdoor store',
      'cabin', 'other'
    ].sort();
    this.setState({filters, activeFilters:[], open:false, alert:false, showOptions: false});
  }

  toggleOptions() {
    this.setState({showOptions:!this.state.showOptions});
  }

  render() {
    const filtersDropDowns = this.state.activeFilters.map((filterService, index)=>{
      return (
        <FilterDropDown key={filterService} index={index} filters={this.state.filters}
                        filterService={filterService}
                        updateFunction={this.updateFilter.bind(this)}
                        removeFunction={this.removeFilter.bind(this, index)}/>
      )
    });
    let dropDown = '';
    if (this.state.showOptions) {
      dropDown = (<DropDown elements={this.state.filters} func={this.addFilter.bind(this)}/>);
    }

    return (
      <div>
        <Layout fixedHeader>
          <Header title="Filter Points"/>
          <ACDrawer page="Filter"/>
          <div className="form-column">
            <div className="form-row">
              <CardText> Types to Display </CardText>
            </div>

            { filtersDropDowns }

            <div className="form-row">
              <Button colored raised onClick={this.toggleOptions.bind(this)}> Add Filter </Button>
            </div>

            { dropDown }

            <div className="form-row">
              <CardText> Display Open Services? </CardText>
            </div>
            <div className="form-row">
              <CardText> Hide Alerts </CardText>
            </div>
            <div className="form-row">
              <Button raised accent onClick={this.clearFilters.bind(this)}> Clear </Button>
              <Button raised colored> Filter </Button>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}

export default FilterPage;
