/*eslint-disable no-unused-vars*/
import React from 'react';
import DropDown from '../drop-down';
import { RaisedButton, CardText, FontIcon, TimePicker } from 'material-ui';
/*eslint-enable no-unused-vars*/

import { bindAll } from 'lodash';
import WizardPage from './wizard-page';

const weekDays = [
  'Weekdays', 'Weekends', 'Monday', 'Tuesday',
  'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

export class AddPointHours extends WizardPage {
  constructor( props ) {
    super( props );
    bindAll(this, 'onDaySelect', 'addHours', 'removeHours');

    this.state = { add: false };
  }

  componentDidMount() {
    const {setDrawer, newPoint} = this.props;
    setDrawer( newPoint._id ? 'Update Hours' : 'Add Hours' );
  }

  onDaySelect() {
    this.setState( { add: true } );
  }

  addHours() {
    const {addPointHours} = this.props;
    const {openPicker, closePicker, dayDropDown} = this.refs;
    const {formatTime} = openPicker;

    const day = dayDropDown.getSelected();
    const opens = formatTime( openPicker.getTime() );
    const closes = formatTime( closePicker.getTime() );

    let days = [];
    if ( day == 'Weekdays' ) {
      days = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ];
    } else if ( day == 'Weekends' ) {
      days = [ 'Saturday', 'Sunday' ];
    } else {
      days = [ day ];
    }
    days.forEach( ( day ) => {
      addPointHours( { day, opens, closes } );
    } );
    dayDropDown.setSelected( weekDays[ ( weekDays.indexOf( day ) + 1 ) % weekDays.length ] );
  }

  removeHours( index ) {
    const {removePointHours} = this.props;
    removePointHours( index );
  }

  getPageContent() {
    const midnight = new Date();
    midnight.setHours( 0, 0, 0, 0 );

    const hours = this.props.newPoint.hours.sort( ( dayA, dayB ) => {
      return weekDays.indexOf( dayA.day ) > weekDays.indexOf( dayB.day );
    } ).map( ( day, index ) => {
      return (
        <div key={ day.day + day.opens + day.closes } className='form-row'>
          <RaisedButton onClick={ this.removeHours.bind( this, index ) }
            label={ `${day.day}: ${day.opens} - ${day.closes}` }
            labelPosition='before'
            icon={ <FontIcon className='material-icons'>
                     clear
                   </FontIcon> } />
        </div>
        );
    } );

    return (
      <div className='wizard-page'>
        <DropDown fullWidth ref='dayDropDown'
          text='Day(s)'
          onSelectFunction={ this.onDaySelect }
          options={ weekDays } />
        <div className='wizard-page__row'>
          <span>Opens at</span>
          <TimePicker fullWidth ref='openPicker'
            format='ampm'
            defaultTime={ midnight } />
        </div>
        <div className='wizard-page__row'>
          <span>Closes at</span>
          <TimePicker fullWidth ref='closePicker'
            format='ampm'
            defaultTime={ midnight } />
        </div>
        { hours }
        <div className="wizard-page__spacer"></div>
        <RaisedButton secondary
          disabled={ !this.state.add }
          onClick={ this.addHours }
          label='Add Hours' />
      </div>
      );
  }

  getPreferredTransition() {
    const { hours } = this.props.newPoint;

    if( hours && hours.length > 0 ) {
      return WizardPage.transitions.next;
    } else {
      return WizardPage.transitions.skip;
    }
  }
}

export default AddPointHours;
