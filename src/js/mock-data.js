export const downloadableTracks = {
  1: { name: 'Track 01', description: 'This track is so excellent!', url: '', downloadSize: 35200, downloading: false, downloaded: 0, subtracks: [ 1, 2 ] },
  2: { name: 'Track 02', description: 'This track is so excellent!', url: '', downloadSize: 25340, downloading: false, downloaded: 0 },
  3: { name: 'Track 03', description: 'This track is so excellent!', url: '', downloadSize: 26400, downloading: false, downloaded: 0 },
  4: { name: 'Track 04', description: 'This track is so excellent!', url: '', downloadSize: 35200, downloading: false, downloaded: 0, subtracks: [ 5, 6 ] },
  5: { name: 'Track 05', description: 'This track is so excellent!', url: '', downloadSize: 25030, downloading: false, downloaded: 0 },
  6: { name: 'Track 06', description: 'This track is so excellent!', url: '', downloadSize: 20646, downloading: false, downloaded: 0 }
};

export const alerts = [ {
  _id: '0',
  name: 'Fire',
  location: [ 43.0830, -77.6722 ],
  type: 'alert',
  description: 'This is a mock data point. There is no fire here.',
  image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg',
  comments: [],
  dateCreated: '',
  flag: [],
  latest: '',
  resolutions: []
} ];

export const services = [ {
  _id: '0',
  name: 'Rochester Institute of Technology',
  description: 'Rochester Institute of Technology is a private university located within the town of Henrietta in the Rochester, New York metropolitan area. RIT is composed of nine academic colleges, including National Technical Institute for the Deaf.',
  type: 'School',
  location: [ 43.0848, -77.6744 ],
  image: 'http://www.usnews.com/img/college-photo_3121._445x280-zmm.JPG',
  comments: [],
  dateCreated: '',
  flag: [],
  amenities: [ 'housing', 'food and drinks', 'medical center' ],
  schedule: [
    {
      // default season listed first
      days: [
        { day: 'Sunday', opens: '10:00 AM', closes: '4:00 PM' },
        { day: 'Monday', opens: '8:00 AM', closes: '10:00 PM' },
        { day: 'Tuesday', opens: '8:00 AM', closes: '10:00 PM' },
        { day: 'Wednesday', opens: '8:00 AM', closes: '6:00 PM' },
        { day: 'Thursday', opens: '8:00 AM', closes: '10:00 PM' },
        { day: 'Friday', opens: '8:00 AM', closes: '10:00 PM' },
        { day: 'Saturday', opens: '10:00 AM', closes: '4:00 PM' }
      ]
    },
    {
      // november 1st to decemeber 31st
      seasonStart: { date: 1, month: 10 },
      seasonEnd: { date: 31, month: 11 },
      days: [
        { day: 'Monday', opens: '11:00 AM', closes: '3:00 PM' },
        { day: 'Tuesday', opens: '11:00 AM', closes: '3:00 PM' },
        { day: 'Wednesday', opens: '1:00 PM', closes: '6:00 PM' },
        { day: 'Thursday', opens: '11:00 AM', closes: '3:00 PM' },
        { day: 'Friday', opens: '11:00 AM', closes: '3:00 PM' }
      ]
    }
  ],
  seasonal: false,
  phone: '1-555-555-5555',
  rating: 4,
  website: 'https://www.rit.edu'
},
  {
    _id: '1',
    name: 'University of Rochester',
    description: 'The University of Rochester is a private, nonsectarian, research university in Rochester, New York. The university grants undergraduate and graduate degrees, including doctoral and professional degrees.',
    type: 'School',
    location: [ 43.130553, -77.626003 ],
    image: 'https://www.rochester.edu/college/psc/images/bg/background22.jpg',
    comments: [],
    dateCreated: '',
    flag: [],
    amenities: [ 'bike trail', 'food and drink', 'library' ],
    schedule: [
      {
        days: [
          { day: 'Sunday', opens: '9:00 AM', closes: '4:00 PM' },
          { day: 'Monday', opens: '9:00 AM', closes: '10:00 PM' },
          { day: 'Tuesday', opens: '9:00 AM', closes: '10:00 PM' },
          { day: 'Wednesday', opens: '9:00 AM', closes: '6:00 PM' },
          { day: 'Thursday', opens: '9:00 AM', closes: '10:00 PM' },
          { day: 'Friday', opens: '9:00 AM', closes: '10:00 PM' },
          { day: 'Saturday', opens: '9:00 AM', closes: '4:00 PM' }
        ]
      }
    ],
    phone: '1-555-555-5555',
    rating: 4,
    website: 'https://www.rochester.edu'
  } ];
