import { combineReducers } from 'redux';
import { tableReducer } from './tableReducer';
import { loginReducer } from './loginReducer';

export const rootReducer = combineReducers({
  tableReducer,
  loginReducer,
});
