import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth, * as fromAuth from './auth.js'
import register from './register.js'
import echo, * as fromEcho from './echo.js'
// import brighteyesInfo from './brighteyesInfo.js'
import bookingReducer from './booking.js'
import galleryReducer from './gallery.js'
import placeReducer from './place.js'
import reminderReducer from './reminder.js'
import serviceCategoryReducer from './service_category.js'
import serviceReducer from './service.js'
import shopReducer from './shop.js'
import users, * as fromUser from './user.js'
import userReviewsReducer from './user_reviews.js'
import selectUserReducer from './select_user.js'

export default combineReducers({
  auth: auth,
  echo: echo,
	register: register,
	// brighteyesInfo: brighteyesInfo,
  bookings: bookingReducer,
  galleries: galleryReducer,
  places: placeReducer,
  reminders: reminderReducer,
  serviceCategories: serviceCategoryReducer,
  services: serviceReducer,
  shops: shopReducer,
  users: users,
  userReviews: userReviewsReducer,
  selectedUser: selectUserReducer
})


export const isAuthenticated = state => fromAuth.isAuthenticated(state.auth)
export const accessToken = state => fromAuth.accessToken(state.auth)
export const isAccessTokenExpired = state => fromAuth.isAccessTokenExpired(state.auth)
export const refreshToken = state => fromAuth.refreshToken(state.auth)
export const isRefreshTokenExpired = state => fromAuth.isRefreshTokenExpired(state.auth)
export const authErrors = state => fromAuth.errors(state.auth)
export const serverMessage = state => fromEcho.serverMessage(state.echo)

export function withAuth(headers={}) {
  return (state) => ({
    ...headers,
    'Authorization': `Bearer ${accessToken(state)}`
  })
}
