import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const CLEAR_ERRORS = 'CLEAR_ERRORS';



export const receiveCurrentUser = currentUser => {
    return({
    type: RECEIVE_CURRENT_USER,
    currentUser
})};

export const receiveUserSignIn = currentUser => {
    return {
       type: RECEIVE_USER_SIGN_IN,
        currentUser 
    }
    
};

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const clearErrors = () =>({
    type: CLEAR_ERRORS
})
export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const signup = user => dispatch => {
    return APIUtil.signup(user).then((currentUser) => (
        dispatch(receiveUserSignIn(currentUser))
    ), err => (
        dispatch(receiveErrors(err.response.data))
    ))
};

export const login = user => dispatch => (
    APIUtil.login(user).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded))
    })
        .catch(err => {
         return dispatch(receiveErrors(err.response.data));
        })
)

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    APIUtil.setAuthToken(false)
    dispatch(logoutUser())
};

export const grabUser = () => dispatch => {
    APIUtil.currentUser()
    .then(user => dispatch(receiveCurrentUser(user)))
}