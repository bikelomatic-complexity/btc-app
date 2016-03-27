export const SET_DRAWER = 'SET_DRAWER';

/* sets a new title on the top nav bar */
export function setDrawer( newTitle ) {
  return { type: SET_DRAWER, newTitle };
}

export default function drawer( state = '', action ) {
  switch ( action.type ) {
  case SET_DRAWER:
    return action.newTitle;
  default:
    return state;
  }
}
