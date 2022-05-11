import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  player: userReducer,
});

export default rootReducer;
