export const MockPoints = [
  {
    _id: 'point/service/rit/abcdef',
	name: 'Rochester Institute of Technology',
	description: 'Rochester Institute of Technology is a private university',
	type: 'School',
	location: [43.0848, -77.6744],
	image: 'http://www.usnews.com/img/college-photo_3121._445x280-zmm.JPG',
	comments: [],
	dateCreated: '',
	flag: [],
	amenities: ["housing", "food and drinks", "medical center"],
	schedule: [
	  {
		//default season listed first
	    days: [
		  {day:'Sunday', opens:'10:00 AM', closes: '4:00 PM'},
		  {day:'Monday', opens:'8:00 AM', closes: '10:00 PM'},
		  {day:'Tuesday', opens:'8:00 AM', closes: '10:00 PM'},
		  {day:'Wednesday', opens:'8:00 AM', closes: '10:00 PM'},
		  {day:'Thursday', opens:'8:00 AM', closes: '10:00 PM'},
		  {day:'Friday', opens:'8:00 AM', closes: '10:00 PM'},
		  {day:'Saturday', opens:'10:00 AM', closes: '4:00 PM'}
		]
	  },
	  {
		//november 1st to december 31st
        seasonStart: {date:1, month: 10},
		seasonEnd: {date:31, month:11},
		days: [
		  {day:'Monday', opens:'11:00 AM', closes: '3:00 PM'},
		  {day:'Tuesday', opens:'11:00 AM', closes: '3:00 PM'},
		  {day:'Wednesday', opens:'1:00 PM', closes: '6:00 PM'},
		  {day:'Thursday', opens:'11:00 AM', closes: '3:00 PM'},
		  {day:'Friday', opens:'11:00 AM', closes: '3:00 PM'}
		]
	  },
	],
	seasonal: false,
	phone: '1-555-555-5555',
	rating: 4,
	website: 'https://www.rit.edu'
  }
]
