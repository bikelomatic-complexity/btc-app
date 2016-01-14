import React, {Component} from 'react';

import { Layout, Header, CardText, Textfield, Button } from 'react-mdl';

import DropDown from './drop-down';

class FilterDropDown extends Component {
  constructor(props) {
    super(props);
    const { filterService } = this.props;
    this.state = {activeFilter: filterService, showOptions: false};
  }

  toggleOptions() {
    this.setState({showOptions:!this.state.showOptions});
  }

  updateFilter(activeFilter) {
    this.props.updateFunction(this.props.index, activeFilter);
    this.setState({activeFilter});
    this.toggleOptions();
  }

  render() {
    const { filters, removeFunction} = this.props;
    return (
      <div>
        <div className="form-row">
          <Button style={{flex:5}} raised onClick={this.toggleOptions.bind(this)}> {this.state.activeFilter} </Button>
          <Button raised accent onClick={removeFunction}> X </Button>
        </div>
      </div>
    );
  }
}

export default FilterDropDown;
