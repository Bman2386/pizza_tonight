import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './session_errors_reducer';
import PizzaPlaceReducer from './pizza_place_reducer';
import ReviewsReducer from './reviews_reducer';


const RootReducer = combineReducers({
    session,
    errors,
    PizzaPlaceReducer,
    ReviewsReducer
});

export default RootReducer;