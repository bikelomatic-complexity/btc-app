export const SET_DRAWER_TITLE = 'SET_DRAWER_TITLE';

/* sets a new title on the top nav bar */
export function setDrawer( newTitle ) {
  return { type: SET_DRAWER_TITLE, newTitle };
}

export default function drawer( state = '', action ) {
  switch ( action.type ) {
  case SET_DRAWER_TITLE:
    return action.newTitle;
  default:
    return state;
  }
}
