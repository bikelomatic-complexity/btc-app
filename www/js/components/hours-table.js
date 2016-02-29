/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { render } from 'react-dom';

import { Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui';
/*eslint-enable no-unused-vars*/

export class HoursTable extends Component {
  render() {
    const hoursData = this.props.hours.map( ( day ) => {
      return (
        <TableRow key={ day.day + day.opens + day.closes }>
          <TableRowColumn>
            { day.day }
          </TableRowColumn>
          <TableRowColumn>
            { day.opens } -
            { day.closes }
          </TableRowColumn>
        </TableRow>
        );
    } );

    return (
      <Table>
        <TableBody displayRowCheckbox={ false }
          adjustForCheckbox={ false }>
          { hoursData }
        </TableBody>
      </Table>
      );
  }
}

export default HoursTable;
