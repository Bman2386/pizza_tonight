import {RECEIVE_PIZZA_PLACE, REMOVE_PIZZA_PLACE, RECEIVE_ERRORS} from '../actions/pizza_place_actions';

const PizzaPlaceReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_PIZZA_PLACE:
            newState[action.pizzaPlace.data.id] = action.pizzaPlace.data;
            return newState;
        case REMOVE_PIZZA_PLACE:
            delete newState[action.pizzaPlaceId];
            return newState;
        case RECEIVE_ERRORS:
            return action.errors;
        default:
            return state;
    }
}

export default PizzaPlaceReducer;