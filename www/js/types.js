export const types = [
  'airport', 'bar', 'bed_and_breakfast', 'bike_shop', 'cabin', 'campground',
  'convenience_store', 'cyclists_camping', 'cyclists_lodging', 'grocery',
  'hostel', 'hot spring', 'hotel', 'motel', 'information', 'library', 'museum',
  'other', 'outdoor_store', 'rest_area', 'restaurant', 'restroom',
  'scenic_area', 'state_park'
];

export const alertTypes = [
  'road_closure', 'forest_fire', 'flooding', 'detour', 'alert_other'
];

const typesEnglish = [
  'Airport', 'Bar', 'Bed & Breakfast', 'Bike Shop', 'Cabin', 'Campground',
  'Convenience Store', 'Cyclists Camping', 'Cyclists Lodging', 'Grocery',
  'Hostel', 'Hot Spring', 'Hotel', 'Motel', 'Information', 'Library', 'Museum',
  'Other', 'Outdoor Store', 'Rest Area', 'Restaurant', 'Restroom',
  'Scenic Area', 'State Park'
];

const alertTypesEnglish = [
  'Road Closure', 'Forest Fire', 'Flooding', 'Detour', 'Other'
];

export function displayType( type ) {
  return typesEnglish[ types.indexOf( type ) ];
}

export function displayAlertType( type ) {
  return alertTypesEnglish[ alertTypes.indexOf( type ) ];
}
