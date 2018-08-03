const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const RECEIVED = 'RECEIVED';
const INIT 		= 'INIT';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, RECEIVED, INIT].forEach(type => res[type] = `${base}_${type}`);
  return res;
}

// export const LOGIN_REQUEST = '@@jwt/LOGIN_REQUEST';
// export const LOGIN_SUCCESS = '@@jwt/LOGIN_SUCCESS';
// export const LOGIN_FAILURE = '@@jwt/LOGIN_FAILURE';
//
// export const TOKEN_REQUEST = '@@jwt/TOKEN_REQUEST';
// export const TOKEN_RECEIVED = '@@jwt/TOKEN_RECEIVED';
// export const TOKEN_FAILURE = '@@jwt/TOKEN_FAILURE';

// Login events
export const LOGIN = createRequestTypes('@@jwt/LOGIN');
export const TOKEN = createRequestTypes('@@jwt/TOKEN');
export const REGISTER = createRequestTypes('@@jwt/REGISTER');

export const LOGOUT = createRequestTypes('@@jwt/LOGOUT'); // logout is always success

export const BRIGHTEYES_INFO = createRequestTypes('BRIGHTEYES_INFO');
export const GET_ALL_USERS = createRequestTypes('GET_ALL_USERS');
export const GET_ALL_SHOPS = createRequestTypes('GET_ALL_SHOPS');
export const GET_ALL_PLACES = createRequestTypes('GET_ALL_PLACES');
export const GET_ALL_SERVICE_CATEGORIES = createRequestTypes('GET_ALL_SERVICE_CATEGORIES');
export const GET_ALL_GALLERIES = createRequestTypes('GET_ALL_GALLERIES');
export const GET_ALL_BOOKINGS = createRequestTypes('GET_ALL_BOOKINGS');
export const GET_ALL_SERVICES = createRequestTypes('GET_ALL_SERVICES');
export const GET_ALL_REMINDERS = createRequestTypes('GET_ALL_REMINDERS');
export const GET_ALL_USER_REVIEWS = createRequestTypes('GET_ALL_USER_REVIEWS');
export const SELECTED_USER = 'SELECTED_USER';
export const GET_BOOKINGS_BY_USER_AND_DAY = createRequestTypes('GET_BOOKINGS_BY_USER_AND_DAY');
export const SET_BOOKING = createRequestTypes('SET_BOOKING')