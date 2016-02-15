import React, { Component } from 'react';
import DropDown from './drop-down';
import { RaisedButton, CardText, FontIcon } from 'material-ui';

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

  componentDidMount() {
    const { setDrawer } = this.props;
    setDrawer('Add Hours');
  }

  addHours(){
    const { addPointHours } = this.props;
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
      addPointHours({day, opens, closes});
    });
    this.setState({day:weekDays[(weekDays.indexOf(day)+1) % weekDays.length]})
    this.forceUpdate();
  }

  removeHours(index){
    const { removePointHours } = this.props;
    removePointHours(index);
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
          if (dayA.day !== dayB.day){
            return weekDays.indexOf(dayA.day) > weekDays.indexOf(dayB.day);
          } else if (dayA.opens !== dayB.opens) {
            return hours.indexOf(dayA.opens) > hours.indexOf(dayB.opens);
          } else {
            return hours.indexOf(dayA.closes) > hours.indexOf(dayB.closes);
          }
        }).map((day, index)=>{
          return (
            <div key={day.day+day.opens+day.closes} className="form-row">
              <RaisedButton
                onClick={this.removeHours.bind(this, index)}
                label={`${day.day}: ${day.opens} - ${day.closes}`}
                labelPosition="before"
                icon={<FontIcon className="material-icons">clear</FontIcon>}
              />
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

export default AddPointHours;
