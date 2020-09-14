import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import {getuser}from './get.reducer';
import {updateuser} from './update.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  getuser,
  updateuser,
  alert,
});

export default rootReducer;