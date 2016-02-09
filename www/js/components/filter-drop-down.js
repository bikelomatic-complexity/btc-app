import React, {Component} from 'react';

import { Button, CardText, Icon } from 'react-mdl';
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
          <CardText style={{flex:5}}>
            {displayType(this.state.activeFilter)}
          </CardText>
          <Button raised accent onClick={removeFunction}>
            <Icon name="clear"/>
          </Button>
        </div>
      </div>
    );
  }
}

export default FilterDropDown;
