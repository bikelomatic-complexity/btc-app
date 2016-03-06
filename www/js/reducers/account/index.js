import { combineReducers } from 'redux';

import login from './login';
import registration from './registration';

export { login, logout } from './login';
export { register } from './registration';

export default combineReducers( { login, registration } );
