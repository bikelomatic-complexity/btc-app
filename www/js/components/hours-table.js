import React, {Component} from 'react';
import { render } from 'react-dom';

import { Layout, Header, Drawer, Navigation, Content, DataTable } from 'react-mdl';

export default class HoursTable extends Component {
  constructor(props) {
    super(props);
  }
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
