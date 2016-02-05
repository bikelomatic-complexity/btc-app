import React, {Component} from 'react';

import { Button, Icon } from 'react-mdl';
import { displayType } from '../types';

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
          <Button style={{flex:5}} raised onClick={updateFunction}>
            {displayType(this.state.activeFilter)}
          </Button>
          <Button raised accent onClick={removeFunction}>
            <Icon name="clear"/>
          </Button>
        </div>
      </div>
    );
  }
}

export default FilterDropDown;
