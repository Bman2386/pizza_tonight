import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT, RECEIVE_USER_SIGN_IN, CLEAR_ERRORS } from '../actions/session_actions';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RECEIVE_USER_LOGOUT:
            //logout
            return {
                isAuthenticated: false,
                user: undefined
            };
        case RECEIVE_CURRENT_USER:
            //log in
            return {
                isAuthenticated: true,
                user: action.currentUser
            }
        case RECEIVE_USER_SIGN_IN: 
        // sign in
            return {
                isAuthenticated: true,
                user: action.currentUser.data
            }
        case CLEAR_ERRORS:
                return [];
        default:
            return state;
    }
}