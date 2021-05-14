import axios from 'axios';

export const fetchPizzaPlace = (pizzaPlace) => {
    return axios.get(`/api/pizzaPlaces/${pizzaPlace.id}`)
}

export const createPizzaPlace = (data) => {
    return axios.post('/api/pizzaPlaces', data)
}

export const updatePizzaPlace = (data) => {
    return axios.post(`/api/pizzaPlaces/${data.id}`, data)
}

export const deletePizzaPlace = (pizzaPlaceId) => {
    return axios.delete(`/api/pizzaPlaces/${pizzaPlaceId}`)
}