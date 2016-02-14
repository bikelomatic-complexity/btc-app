import React, {Component} from 'react';
import { render } from 'react-dom';

import { DataTable } from 'react-mdl';

export class HoursTable extends Component {
  render() {
    const columns = [
      {name: 'day', label: ''},
      {name: 'hours', label: 'Open Hours'},
    ];

    const hoursData = this.props.hours.map((day) => {
      return {
        'day':day.day,
        'hours':day.opens + " - " + day.closes
      }
    });

    return (
        <div>
            <DataTable columns={columns} data={hoursData} />
        </div>
    );
  }
}

export default HoursTable;
