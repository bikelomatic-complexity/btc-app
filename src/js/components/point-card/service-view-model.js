import { isEmpty, find } from 'lodash';
import { display } from 'btc-models/lib/schema/types';

export class ServiceViewModel {
  constructor( service ) {
    this.service = service;
  }

  amenities() {
    const {amenities} = this.service;
    if ( !isEmpty( amenities ) ) {
      let amenities_and = [ ...amenities.map( display ) ];

      let seperator;
      if ( amenities.length > 2 ) { // 1, 2, and 3
        amenities_and.push( 'and ' + amenities_and.pop() );
        seperator = ", ";
      } else if ( amenities.length > 1 ) { // 1 and 2
        amenities_and.push( 'and ' + amenities_and.pop() );
        seperator = " ";
      } else {
        seperator = "";
      }

      return 'Amenities include: ' + amenities_and.join( seperator );
    } else {
      return 'Amenities: none listed';
    }
  }

  hasSchedule() {
    return !isEmpty( this.service.schedule );
  }

  openUntil() {
    if ( this.hasSchedule() ) {
      const week = this.getWeekForCurrentSeason( this.service.schedule );
      const hours = find( week, { day: ServiceViewModel.today() } );

      return hours ? `Open until: ${ hours.closes }` : 'Not open today';
    } else {
      return;
    }
  }

  static today() {
    const dayIndex = new Date().getDay();
    const dayNames = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

    return dayNames[ dayIndex ];
  }

  getWeekForCurrentSeason() {
    const seasons = this.service.schedule;

    let seasonDays = seasons[ 0 ].days;
    const date = ( new Date() );
    const curMonth = date.getMonth();
    const curDate = date.getDate();
    seasons.forEach( season => {
      if ( ( season.seasonStart )
          && ( season.seasonEnd )
          && ( season.seasonStart.month <= curMonth <= season.seasonEnd.month )
          && ( season.seasonStart.date <= curDate <= season.seasonEnd.date ) ) {
        seasonDays = season.days;
      }
    } );
    return seasonDays;
  }

  getSeasonExplanation() {
    if ( this.service.seasonal ) {
      return 'These hours are seasonal. Call or check online for more information';
    } else {
      return
    }
  }
}

export default ServiceViewModel;
