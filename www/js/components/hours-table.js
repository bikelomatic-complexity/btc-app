import React, {Component} from 'react';
import { render } from 'react-dom';

import { Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui';

export class HoursTable extends Component {
  render() {
    const columns = [
      {name: 'day', label: ''},
      {name: 'hours', label: 'Open Hours'},
    ];

    const hoursData = this.props.hours.map((day) => {
      return (
        <TableRow>
          <TableRowColumn>{day.day}</TableRowColumn>
          <TableRowColumn>{day.opens} - {day.closes}</TableRowColumn>
        </TableRow>
      );
      return {
        'day':day.day,
        'hours':day.opens + " - " + day.closes
      }
    });

    return (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col)=>{
                return (<TableHeaderColumn>{col.label}</TableHeaderColumn>);
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {hoursData}
          </TableBody>
        </Table>
    );
  }
}

export default HoursTable;
