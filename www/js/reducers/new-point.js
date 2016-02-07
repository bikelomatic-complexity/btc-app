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
          REMOVE_POINT_AMENITIES,
          CLEAR_POINT_PROPS
        } from '../actions/new-point-actions';

const cleanState = {
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
}

const initialState = Object.assign({},cleanState);

export default function newPoint(state=initialState, action) {
  switch (action.type) {
    case SET_POINT_NAME:
      return Object.assign({}, state, {name:action.name});
    case SET_POINT_LOCATION:
      return Object.assign({}, state, {location:action.location});
    case SET_POINT_TYPE:
      return Object.assign({}, state, {type:action.pointType});
    case SET_POINT_DESCRIPTION:
      return Object.assign({}, state, {description:action.description});
    case SET_POINT_ADDRESS:
      return Object.assign({}, state, {address:action.address});
    case SET_POINT_IMAGE:
      return Object.assign({}, state, {imageSrc:action.imageSrc});
    case SET_POINT_WEBSITE:
      return Object.assign({}, state, {website:action.website});
    case SET_POINT_PHONE:
      return Object.assign({}, state, {phoneNumber:action.phoneNumber});
    case ADD_POINT_HOURS:
      state.hours.push(action.newHours);
      return Object.assign({}, state);
    case REMOVE_POINT_HOURS:
      state.hours.splice(action.hourIndex, 1);
      return Object.assign({}, state);;
    case ADD_POINT_AMENITIES:
      state.amenities.push(action.newAmenity);
      return Object.assign({}, state);;
    case REMOVE_POINT_AMENITIES:
      state.amenities.splice(action.amenityIndex, 1);
      return Object.assign({}, state);;
    case CLEAR_POINT_PROPS:
      console.log(initialState);
      console.log(cleanState);
      return Object.assign({},cleanState);
    default:
      return state;
  }
}
