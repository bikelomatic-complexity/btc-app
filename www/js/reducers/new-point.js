import {  SET_POINT_NAME,
          SET_POINT_LOCATION,
          SET_POINT_TYPE,
          SET_POINT_DESCRIPTION,
          SET_POINT_ADDRESS,
          SET_POINT_IMAGE,
          SET_POINT_WEBSITE,
          SET_POINT_PHONE,
          ADD_POINT_HOURS,
          REMOVE_POINT_HOURS,
          ADD_POINT_AMENITIES,
          REMOVE_POINT_AMENITIES
        } from '../actions/new-point-actions';

export default function newPoint(state = {
  name:'',
  location:[],
  type:'',
  description:'',
  address:'',
  imageSrc:'',
  website:'',
  phoneNumber:'',
  hours:[],
  amenities:[]
}, action) {
  let newState;
  switch (action.type) {
    case SET_POINT_NAME:
      newState = Object.assign(state, {name:action.name})
      return newState;
    case SET_POINT_LOCATION:
      newState = Object.assign(state, {location:action.location})
      return newState;
    case SET_POINT_TYPE:
      newState = Object.assign(state, {type:action.pointType})
      return newState;
    case SET_POINT_DESCRIPTION:
      newState = Object.assign({}, state, {description:action.description});
      return newState;
    case SET_POINT_ADDRESS:
      newState = Object.assign(state, {address:action.address})
      return newState;
    case SET_POINT_IMAGE:
      newState = Object.assign(state, {imageSrc:action.imageSrc})
      return newState;
    case SET_POINT_WEBSITE:
      newState = Object.assign(state, {website:action.website})
      return newState;
    case SET_POINT_PHONE:
      newState = Object.assign(state, {phoneNumber:action.phoneNumber})
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
