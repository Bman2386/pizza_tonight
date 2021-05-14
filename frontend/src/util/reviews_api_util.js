import axios from 'axios';

export const fetchReviews = () => {
    return axios.get(`/api/reviews`);
}

export const fetchReview = (reviewId) => {
   return axios.get(`/api/reviews/${reviewId}`);
}

export const createReview = data => {
  return  axios.get('/api/reviews', data);
}

export const updateReview = data => {
    return axios.post(`/api/reviews/${data.id}`, data);
}

export const deleteReview = (reviewId) => {
    return axios.delete(`/api/reviews/${reviewId}`)
}