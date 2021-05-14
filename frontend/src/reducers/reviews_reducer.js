import { RECEIVE_ALL_REVIEWS, RECEIVE_REVIEW, REMOVE_REVIEW, RECEIVE_ERRORS } from '../actions/reviews_actions';

const ReviewsReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_ALL_REVIEWS:
            action.reviews.forEach( review => newState[review._id] = review)
            return newState;
        case RECEIVE_REVIEW:
            newState[action.review.data._id] = action.review.data
            return newState;
        case REMOVE_REVIEW:
            delete newState[action.reviewId];
            return newState;
        case RECEIVE_ERRORS:
            return action.errors;
        // case RECEIVE_AUTHOR:

        //     newState[action.author.data._id] = action.author.data
        //     return newState;
        default:
            return state;
    }
}

export default ReviewsReducer;