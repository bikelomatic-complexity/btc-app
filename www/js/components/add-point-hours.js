import React, { Component } from 'react';
import DropDown from './drop-down';
// import redux components
import { connect } from 'react-redux';
import { RaisedButton, CardText, FontIcon } from 'material-ui';

import { addPointHours, removePointHours } from '../actions/new-point-actions';

const weekDays = [
  "Weekdays", "Weekends", "Monday", "Tuesday",
  "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

export class AddPointHours extends Component {

  constructor(props) {
    super(props);
    this.state = {
      day:null,
      opens:null,
      closes:null
    }
  }

  addHours(){
    const { dispatch } = this.props;
    const { day, opens, closes } = this.state;

    let days = [];
    if ( day == 'Weekdays') {
      days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
    } else if ( day == 'Weekends' ) {
      days = ["Saturday","Sunday"];
    } else {
      days = [day];
    }
    days.forEach((day)=>{
      dispatch(addPointHours({day, opens, closes}));
    });
    this.setState({day:weekDays[(weekDays.indexOf(day)+1) % weekDays.length]})
    this.forceUpdate();
  }

  removeHours(index){
    const { dispatch } = this.props;
    dispatch(removePointHours(index));
    this.forceUpdate();
  }

  selectDay(day){
    this.setState({day});
  }

  selectOpens(opens){
    this.setState({opens});
  }

  selectCloses(closes){
    this.setState({closes});
  }

  render() {
    const hours = [
      '12:00 AM','12:30 AM','1:00 AM','1:30 AM','2:00 AM','2:30 AM','3:00 AM',
      '3:30 AM','4:00 AM','4:30 AM','5:00 AM','5:30 AM','6:00 AM','6:30 AM',
      '7:00 AM','7:30 AM','8:00 AM','8:30 AM','9:00 AM','9:30 AM','10:00 AM',
      '10:30 AM','11:00 AM','11:30 AM',
      '12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM',
      '3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM',
      '7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM','10:00 PM',
      '10:30 PM','11:00 PM','11:30 PM'
    ];


    const { day, opens, closes } = this.state;
    const addHoursButton = (
      <RaisedButton secondary
              disabled={ !(day && opens && closes) }
              onClick={this.addHours.bind(this)}>
        Add
      </RaisedButton>
    );

    return (
      <div className="form-column">
        {this.props.newPoint.hours.sort((dayA, dayB)=>{
          return weekDays.indexOf(dayA.day) > weekDays.indexOf(dayB.day)
        }).map((day, index)=>{
          return (
            <div key={day.day+day.opens+day.closes} className="form-row">
              <CardText style={{flex:'5'}}>{day.day}: {day.opens} - {day.closes}</CardText>
              <RaisedButton primary onClick={this.removeHours.bind(this, index)}>
                <FontIcon className="material-icons">clear</FontIcon>
              </RaisedButton>
            </div>
          )
        })}
        <div className="form-row">
          <DropDown text={"Day(s)"} value={this.state.day}
                  onSelectFunction={this.selectDay.bind(this)}
                  options={weekDays}/>
          <DropDown text="Opens"
                  onSelectFunction={this.selectOpens.bind(this)}
                  options={hours}/>
          <DropDown text="Closes"
                  onSelectFunction={this.selectCloses.bind(this)}
                  options={hours}/>
          { addHoursButton }
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    newPoint: state.newPoint
  };
}

export default connect(select)(AddPointHours);
