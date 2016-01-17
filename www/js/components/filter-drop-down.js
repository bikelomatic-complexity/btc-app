import React, {Component} from 'react';

import { Button } from 'react-mdl';

class FilterDropDown extends Component {
  constructor(props) {
    super(props);
    const { filterService } = this.props;
    this.state = {activeFilter: filterService};
  }

  render() {
    const { filters, removeFunction, updateFunction } = this.props;
    return (
      <div>
        <div className="form-row">
          <Button style={{flex:5}} raised onClick={updateFunction}> {this.state.activeFilter} </Button>
          <Button raised accent onClick={removeFunction}> X </Button>
        </div>
      </div>
    );
  }
}

export default FilterDropDown;
