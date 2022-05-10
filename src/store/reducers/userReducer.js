const initialState = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
  case 'user/nameSet':
    console.log(action);
    return {
      ...state,
      name: action.payload,
    };
  case 'user/emailSet':
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case 'user/scoreUpdate':
    return {
      ...state,
      score: action.payload,
    };
  default: return state;
  }
}
