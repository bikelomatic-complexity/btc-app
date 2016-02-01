export function newPoint(state = {
  name:'',
  location:[],
  type:0,
  description:'',
  address:'',
  imageSrc:'',
  website:'',
  phoneNumber:'',
  hours:[],
  amenities:[]
}, action) {
  switch (action.type) {
    case SET_POINT_NAME:
      const newState = Object.assign(state, {name:action.name})
      return newState;
    case SET_POINT_LOCATION:
      const newState = Object.assign(state, {location:action.location})
      return newState;
    case SET_POINT_TYPE:
      const newState = Object.assign(state, {type:action.pointType})
      return newState;
    case SET_POINT_DESCRIPTION:
      const newState = Object.assign(state, {description:action.description})
      return newState;
    case SET_POINT_ADDRESS:
      const newState = Object.assign(state, {address:action.address})
      return newState;
    case SET_POINT_IMAGE:
      const newState = Object.assign(state, {imageSrc:action.imageSrc})
      return newState;
    case SET_POINT_WEBSITE:
      const newState = Object.assign(state, {website:action.website})
      return newState;
    case SET_POINT_PHONE:
      const newState = Object.assign(state, {phoneNumber:action.phoneNumber})
      return newState;
    case ADD_POINT_HOURS:
      state.hours.push(action.newHours);
      return state;
    case REMOVE_POINT_HOURS:
      state.hours.splice(action.hourIndex, 1);
      return state;
    case ADD_POINT_AMENITIES:
      state.amenities.push(action.newAmenity);
      return state;
    case REMOVE_POINT_AMENITIES:
      state.amenities.splice(action.amenityIndex, 1);
      return state;
    default:
      return state;
  }
}
