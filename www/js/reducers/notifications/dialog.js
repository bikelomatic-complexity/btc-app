export const SET_DIALOG = 'btc-app/dialog/SET_DIALOG';
export const CLOSE_DIALOG = 'btc-app/dialog/CLOSE_DIALOG';

const initialState = {
  title: "",
  description: "",
  modal: false,
  actions: [],
  open: false
}

export default function dialog( state = initialState, action ) {
  switch ( action.type ) {
  case SET_DIALOG:
    return Object.assign( state, action.dialog, { open: true } );
  case CLOSE_DIALOG:
    return { title: "", description: "", modal: false, actions: [], open: false };
  default:
    return state;
  }
}

export function setDialog( dialog ) {
  return {
    type: SET_DIALOG,
  dialog };
}

export function closeDialog() {
  return {
    type: CLOSE_DIALOG
  };
}

/*
call setDialog from this.props

example:
setDialog({
  title:"testing dialog",
  description:"testing dialog description",
  modal:true,
  actions:[
    {label:"cancel"},
    {label:"submit", disabled:true}
  ]
});

title- the title for the dialog
description- content inside the dialog
modal- true: it can only be closed by selecting a button (not by clicking outside the window)
actions- a list of json objects that turn into FlatButtons... details below

actions Json (all fields are optional)
{
  label: string (label of button)
  tapHandler: function (gets called when button is clicked)
  disabled: boolean (used to determine if button is disabled)
  primary: boolean (used to determine if button is primary theme color)
  secondary: boolean (used to determine if button is secondary theme color)
  keyboardFocused: boolean (if button is default option)
}

*/
