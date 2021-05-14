import * as PizzaPlaceApiUtil from '../util/pizza_place_api_util';

export const RECEIVE_PIZZA_PLACE = 'RECEIVE_PIZZA_PLACE';
export const REMOVE_PIZZA_PLACE = 'REMOVE_PIZZA_PLACE';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

const receivePizzaPlace = pizzaPlace => {
    return {
        type: RECEIVE_PIZZA_PLACE,
        pizzaPlace
    }
};

const removePizzaPlace = pizzaPlaceId => {
    return {
        type: REMOVE_PIZZA_PLACE,
        pizzaPlaceId
    }
};

const receiveErrors = errors => {
    return {
        type: RECEIVE_ERRORS,
        errors
    }
};

export const fetchPizzaPlace = pizzaPlaceId => dispatch => {
    return PizzaPlaceApiUtil.fetchPizzaPlace(pizzaPlaceId)
        .then(pizzaPlace => dispatch(receivePizzaPlace(pizzaPlace)))
};

export const createPizzaPlace = pizzaPlace => dispatch => {
    return PizzaPlaceApiUtil.createPizzaPlace(pizzaPlace)
        .then(pizzaPlace => dispatch(receivePizzaPlace(pizzaPlace))
        ), err => (
            dispatch(receiveErrors(err.respons.data))
        )
}

export const updatePizzaPlace = pizzaPlace => dispatch => {
    return PizzaPlaceApiUtil.updatePizzaPlace(pizzaPlace)
        .then(pizzaPlace => dispatch(receivePizzaPlace(pizzaPlace))
        ), err => (
            dispatch(receiveErrors(err.response.data))
        )
}

export const deletePizzaPlace = pizzaPlaceId => dispatch => {
    return PizzaPlaceApiUtil.deletePizzaPlace(pizzaPlaceId)
        .then(() => dispatch(removePizzaPlace(pizzaPlaceId))
        ), err => (
            dispatch(receiveErrors(err.response.data))
        )
}