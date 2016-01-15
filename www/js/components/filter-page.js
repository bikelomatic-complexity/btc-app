import React, {Component} from 'react';

import { Layout, Header, CardText, Checkbox, Textfield, Button } from 'react-mdl';

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
    this.state = {filters, activeFilters:[], openServices:false, alert:false, showOptions: -1};
  }

  addFilter(service) {
    const activeFilters = this.state.activeFilters;
    const filters = this.state.filters;
    activeFilters.push(service);
    filters.splice(filters.indexOf(service),1);
    this.setState({activeFilters, filters});
    this.toggleOptions(-1);
  }

  updateFilter(index, service) {
    const { activeFilters, filters } = this.state;
    const oldFilter = activeFilters[index];
    filters.splice(filters.indexOf(service),1);
    activeFilters[index] = service;
    filters.push(oldFilter);
    filters.sort();
    this.setState({activeFilters});
    this.toggleOptions(-1);
  }

  removeFilter(index) {
    const { activeFilters, filters } = this.state;
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
    this.setState({filters, activeFilters:[], openServices:false, alert:false, showOptions: -1});
  }

  toggleOptions({index=-1}) {
    // do not toggle options if there are no options left
    if (this.state.filters.length < 1) {
      index = -1;
    }
    this.setState({showOptions:index});
  }

  toggleOpenServices() {
    this.setState({openServices:(!this.state.openServices)})
  }

  toggleAlert() {
    this.setState({alert:(!this.state.alert)})
  }

  render() {
    const filtersDropDowns = this.state.activeFilters.map((filterService, index)=>{
      return (
        <FilterDropDown key={filterService} index={index} filters={this.state.filters}
                        filterService={filterService}
                        updateFunction={this.toggleOptions.bind(this, {index})}
                        removeFunction={this.removeFilter.bind(this, index)}/>
      )
    });
    let dropDown = '';
    if (this.state.showOptions >= 0) {
      let func = this.addFilter.bind(this);
      if (this.state.showOptions < this.state.activeFilters.length) {
        func = this.updateFilter.bind(this,this.state.showOptions);
      }
      dropDown = (<DropDown elements={this.state.filters} func={func}/>);
    }

    return (
      <div>
        <Layout fixedHeader>
          <Header title="Filter Points"/>
          <ACDrawer page="Filter"/>
          <div className="form-column">

            { filtersDropDowns }

            <div className="form-row">
              <Button colored raised
                      onClick={this.toggleOptions.bind(this,{index:this.state.activeFilters.length})}
                      disabled={this.state.filters.length < 1}>
                Add Filter
              </Button>
            </div>

            { dropDown }

            <div className="form-row">
              <Checkbox label="Display Open Services?"
                        onChange={this.toggleOpenServices.bind(this)}
                        checked={this.state.openServices}/>
            </div>

            <div className="form-row">
              <Checkbox label="Hide Alerts"
                        onChange={this.toggleAlert.bind(this)}
                        checked={this.state.alert}/>
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
