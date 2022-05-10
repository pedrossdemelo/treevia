import { saveState } from '../../utils';

export const setToken = (token) => {
  saveState('token', token);
  return {
    type: 'token/tokenSet',
    payload: token,
  };
};

export const setName = (name) => ({
  type: 'user/nameSet',
  payload: name,
});

export const setEmail = (email) => ({
  type: 'user/emailSet',
  payload: email,
});

export const updateScore = (score) => ({
  type: 'user/scoreUpdate',
  payload: score,
});
