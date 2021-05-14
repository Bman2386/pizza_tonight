import { RECEIVE_SESSION_ERRORS } from '../actions/session_actions';

const _nullErrors = [];

const SessionErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    // let newState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
    
        default:
            return state;
    }
};

export default SessionErrorsReducer;