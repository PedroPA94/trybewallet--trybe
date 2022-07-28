import USER_LOGIN from './actionTypes';

const loginUser = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

export default loginUser;
