import React, { Component } from 'react';
import { CardText, Button, Icon } from 'react-mdl';

// import redux components
import { connect } from 'react-redux';

import { addPointHours, removePointHours } from '../actions/new-point-actions';

const weekDays = [
  "Weekdays", "Weekends", "Monday", "Tuesday",
  "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

export class AddPointHours extends Component {

  constructor(props) {
    super(props);
    this.state = {
      day:'Weekdays',
      opens:'8:00 AM',
      closes:'5:00 PM'
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

  selectDay(event){
    this.setState({day:event.target.value});
  }

  selectOpens(event){
    this.setState({opens:event.target.value});
  }

  selectCloses(event){
    this.setState({closes:event.target.value});
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

    const hourOptions = hours.map((time)=>{
      return <option key={time} value={time}>{time}</option>
    });

    let addHoursButton = (
      <Button colored
              onClick={this.addHours.bind(this)}>
        Add
      </Button>
    );
    if (this.props.newPoint.hours && this.props.newPoint.amenities.includes(this.state.amenity)) {
      addHoursButton = (
        <Button disabled colored> Add </Button>
      );
    }

    return (
      <div className="form-column">
        {this.props.newPoint.hours.sort((dayA, dayB)=>{
          return weekDays.indexOf(dayA.day) > weekDays.indexOf(dayB.day)
        }).map((day, index)=>{
          return (
            <div key={day.day+day.opens+day.closes} className="form-row">
              <CardText style={{flex:'5'}}>{day.day}: {day.opens} - {day.closes}</CardText>
              <Button raised accent onClick={this.removeHours.bind(this, index)}>
                <Icon name="clear"/>
              </Button>
            </div>
          )
        })}
        <div className="form-row">
          <select style={{flex:3}}
                  value={this.state.day}
                  className="mdl-button mdl-button--raised"
                  onChange={this.selectDay.bind(this)}>
            {weekDays.map((day)=>{
              return (<option key={day} value={day}>{day}</option>);
            })}
          </select>
          <select style={{flex:2}} className="mdl-button mdl-button--raised"
                  value={this.state.opens}
                  onChange={this.selectOpens.bind(this)}>
            { hourOptions }
          </select>
          <select style={{flex:2}} className="mdl-button mdl-button--raised"
                  value={this.state.closes}
                  onChange={this.selectCloses.bind(this)}>
            { hourOptions }
          </select>
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
