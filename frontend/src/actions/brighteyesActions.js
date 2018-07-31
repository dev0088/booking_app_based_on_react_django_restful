import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import * as types from './actionTypes'

export const getBrightEyesInfo = () => ({
	  [RSAA]: {
        endpoint: `${apiConfig.url}/brighteyes_info/all`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
          types.BRIGHTEYES_INFO.REQUEST, types.BRIGHTEYES_INFO.SUCCESS, types.BRIGHTEYES_INFO.FAILURE
        ]
    }
})

export const getUsers = () => ({
	  [RSAA]: {
        endpoint: `${apiConfig.url}/auth/users/`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
        types: [
          types.GET_ALL_USERS.REQUEST, types.GET_ALL_USERS.SUCCESS, types.GET_ALL_USERS.FAILURE
        ]
    }
})

export const getShops = () => ({
	  [RSAA]: {
        endpoint: `${apiConfig.url}/shops/all`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
          types.GET_ALL_SHOPS.REQUEST, types.GET_ALL_SHOPS.SUCCESS, types.GET_ALL_SHOPS.FAILURE
        ]
    }
})


export const getPlaces = () => ({
	  [RSAA]: {
        endpoint: `${apiConfig.url}/places/all`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
          types.GET_ALL_PLACES.REQUEST, types.GET_ALL_PLACES.SUCCESS, types.GET_ALL_PLACES.FAILURE
        ]
    }
})

export const getServices = () => ({
	  [RSAA]: {
        endpoint: `${apiConfig.url}/services/all`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
          types.GET_ALL_SERVICES.REQUEST, types.GET_ALL_SERVICES.SUCCESS, types.GET_ALL_SERVICES.FAILURE
        ]
    }
})

export const getServiceCategories = () => ({
	  [RSAA]: {
        endpoint: `${apiConfig.url}/service_categories/all`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
          types.GET_ALL_SERVICE_CATEGORIES.REQUEST, types.GET_ALL_SERVICE_CATEGORIES.SUCCESS, types.GET_ALL_SERVICE_CATEGORIES.FAILURE
        ]
    }
})

export const getGalleries = () => ({
	  [RSAA]: {
        endpoint: `${apiConfig.url}/galleries/all`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
          types.GET_ALL_GALLERIES.REQUEST, types.GET_ALL_GALLERIES.SUCCESS, types.GET_ALL_GALLERIES.FAILURE
        ]
    }
})

export const getBookings = () => ({
      [RSAA]: {
        endpoint: `${apiConfig.url}/bookings/all`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
          types.GET_ALL_BOOKINGS.REQUEST, types.GET_ALL_BOOKINGS.SUCCESS, types.GET_ALL_BOOKINGS.FAILURE
        ]
    }
})

export const getUserReviews = () => ({
      [RSAA]: {
        endpoint: `${apiConfig.url}/auth/user_reviews/`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
          types.GET_ALL_USER_REVIEWS.REQUEST, types.GET_ALL_USER_REVIEWS.SUCCESS, types.GET_ALL_USER_REVIEWS.FAILURE
        ]
    }
})


