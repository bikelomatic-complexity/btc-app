import React, {Component} from 'react';

import { RaisedButton, FontIcon, CardText } from 'material-ui';
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
          <RaisedButton primary onClick={removeFunction}
            icon={<FontIcon className="material-icons">clear</FontIcon>}/>
        </div>
      </div>
    );
  }
}

export default FilterDropDown;
