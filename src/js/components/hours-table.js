/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { render } from 'react-dom';

import ClearIcon from 'material-ui/lib/svg-icons/content/clear';
import { Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableRowColumn, IconButton } from 'material-ui';
/*eslint-enable no-unused-vars*/

import { days } from 'btc-models';

function format( date ) {
  return new Date( date ).toLocaleTimeString( [], {
    hour: 'numeric',
    minute: 'numeric'
  } );
}

export class HoursTable extends Component {
  render() {
    const {removable, onRowRemove} = this.props;

    let keyCounter = 0;
    const hoursData = this.props.hours.map( ( row, index ) => {
      let remove;
      if ( removable ) {
        const button = (
        <IconButton onClick={ ( ) => onRowRemove( index ) }>
          <ClearIcon />
        </IconButton>
        );
        remove = (
          <TableRowColumn>
            { button }
          </TableRowColumn>
        );
      }
      return (
        <TableRow key={ keyCounter++ }>
          <TableRowColumn>
            { days[ row.day ].display }
          </TableRowColumn>
          <TableRowColumn>
            { format( row.opens ) }
          </TableRowColumn>
          <TableRowColumn>
            { format( row.closes ) }
          </TableRowColumn>
          { remove }
        </TableRow>
        );
    } );

    let remove;
    if ( removable ) {
      remove = (
        <TableHeaderColumn>
          Remove
        </TableHeaderColumn>
      );
    }

    return (
      <Table style={ { overflowY: 'visible' } }
        selectable={ false }>
        <TableHeader displaySelectAll={ false }
          adjustForCheckbox={ false }>
          <TableRow>
            <TableHeaderColumn>
              Day
            </TableHeaderColumn>
            <TableHeaderColumn>
              Opens
            </TableHeaderColumn>
            <TableHeaderColumn>
              Closes
            </TableHeaderColumn>
            { remove }
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={ false }
          adjustForCheckbox={ false }>
          { hoursData }
        </TableBody>
      </Table>
      );
  }
}

HoursTable.defaultProps = {
  removable: false
};

export default HoursTable;
