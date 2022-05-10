import { loadState } from '../../utils';

const initialState = loadState('token') ?? '';

export default function tokenReducer(state = initialState, action) {
  switch (action.type) {
  case 'token/tokenSet': return action.payload;
  default: return state;
  }
}
