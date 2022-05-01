import * as types from '../type/actionTypes'

const initState = {};

const account = (state = initState, { type, payload }) => {
  switch (type) {
    case types.ACCOUNT_LOGIN:
        return payload;
    case types.ACCOUNT_LOGOUT:
        return {};
    default:
      return state
  }
}

export default account;
