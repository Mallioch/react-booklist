import { createStore } from 'redux';

const actions = {
  LOGIN_USERNAME_CHANGE: 'LOGIN_USERNAME_CHANGE',
  LOGIN_PASSWORD_CHANGE: 'LOGIN_PASSWORD_CHANGE',
  LOGIN: 'LOGIN',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT'
}

const initialState = {
  isLoggedIn: false,
  loginUsernameValue: '',
  loginPasswordValue: '',
  loginErrorMessage: ''
}

const reducer = (state = initialState, action) => {
  console.log('reducer', action);
  switch (action.type) {
    case actions.LOGIN_USERNAME_CHANGE:
      return Object.assign({}, state, { loginUsernameValue: action.value });
    case actions.LOGIN_PASSWORD_CHANGE:
      return Object.assign({}, state, { loginPasswordValue: action.value });
    case actions.LOGIN: {
      return Object.assign({}, state, {
        loginUsernameValue: '',
        loginPasswordValue: '',
        isLoggedIn: true,
        loginErrorMessage: ''
      });
    }
    case actions.LOGIN_FAILURE:
      return Object.assign({}, state, { loginErrorMessage: action.message });
    default: return state;
  }
}

const store = createStore(reducer);

module.exports = {
  store: store,
  actions: actions
}
