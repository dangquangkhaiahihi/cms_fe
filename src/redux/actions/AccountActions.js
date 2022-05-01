import * as types from '../type/actionTypes';

// INITIALIZES CLOCK ON SERVER
export const loadLoginInfo = (account) => (dispatch) => {
    dispatch({
        type: types.ACCOUNT_LOGIN,
        payload: account,
    })
}

export const logout = () => (dispatch) => {
    dispatch({
        type: types.ACCOUNT_LOGOUT,
    })
}
  