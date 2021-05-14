import * as ReviewsApiUtil from '../util/reviews_api_util';

export const RECEIVE_ALL_REVIEWS = 'RECEIVE_ALL_REVIEWS';
export const RECEIVE_REVIEW = 'RECEIVE_REVIEW';
export const REMOVE_REVIEW = 'REMOVE_REVIEW';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';


const receiveAllReviews = reviews => ({
    type: RECEIVE_ALL_REVIEWS,
    reviews
});

const receiveReview = review => {
    return {
        type: RECEIVE_REVIEW,
        review
    }
};

const removeReview = reviewId => ({
    type: REMOVE_REVIEW,
    reviewId
});

const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
})


export const fetchReviews = () => dispatch => {
    ReviewsApiUtil.fetchReviews()
        .then(reviews => dispatch(receiveAllReviews(reviews.data)))
};

export const fetchReview = reviewId => dispatch => (
    ReviewsApiUtil.fetchReview(reviewId)
        .then(review => dispatch(receiveReview(review)))
);


export const createReview = review => dispatch => {
    return ReviewsApiUtil.createReview(review)
        .then(review => dispatch(receiveReview(review))
        ), err => (
            dispatch(receiveErrors(err.response.data))
        )
};

export const updateReview = review => dispatch => {
    return ReviewsApiUtil.updateReview(review)
        .then(review => dispatch(receiveReview(review))
        ), err => (
            dispatch(receiveErrors(err.response.data))
        )
};

export const deleteReview = reviewId => dispatch => (
    ReviewsApiUtil.deleteReview(reviewId)
        .then(() => dispatch(removeReview(reviewId))
        ), err => (
            dispatch(receiveErrors(err.response.data))
        )
);