import { combineReducers } from 'redux';
import userReducer from './userReducer';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({
  player: userReducer,
  token: tokenReducer,
});

export default rootReducer;
