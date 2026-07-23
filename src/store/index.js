import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'

const initialState = {
  auth: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  users: {
    list: [],
    loading: false,
    error: null,
    pagination: { page: 1, limit: 10, total: 0 },
  },
  stats: {
    data: null,
    loading: false,
    error: null,
  },
}

const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST'
const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'
const AUTH_LOGOUT = 'AUTH_LOGOUT'
const AUTH_REGISTER_REQUEST = 'AUTH_REGISTER_REQUEST'
const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS'
const AUTH_REGISTER_FAILURE = 'AUTH_REGISTER_FAILURE'

const USERS_FETCH_REQUEST = 'USERS_FETCH_REQUEST'
const USERS_FETCH_SUCCESS = 'USERS_FETCH_SUCCESS'
const USERS_FETCH_FAILURE = 'USERS_FETCH_FAILURE'

const STATS_FETCH_REQUEST = 'STATS_FETCH_REQUEST'
const STATS_FETCH_SUCCESS = 'STATS_FETCH_SUCCESS'
const STATS_FETCH_FAILURE = 'STATS_FETCH_FAILURE'

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
    case AUTH_REGISTER_REQUEST:
      return { ...state, auth: { ...state.auth, loading: true, error: null } }
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        auth: { ...state.auth, loading: false, user: action.payload.user, token: action.payload.token, error: null },
      }
    case AUTH_LOGIN_FAILURE:
    case AUTH_REGISTER_FAILURE:
      return { ...state, auth: { ...state.auth, loading: false, error: action.payload } }
    case AUTH_REGISTER_SUCCESS:
      return { ...state, auth: { ...state.auth, loading: false, error: null } }
    case AUTH_LOGOUT:
      return { ...state, auth: { ...initialState.auth } }

    case USERS_FETCH_REQUEST:
      return { ...state, users: { ...state.users, loading: true, error: null } }
    case USERS_FETCH_SUCCESS:
      return { ...state, users: { ...state.users, loading: false, list: action.payload.users, pagination: action.payload.pagination } }
    case USERS_FETCH_FAILURE:
      return { ...state, users: { ...state.users, loading: false, error: action.payload } }

    case STATS_FETCH_REQUEST:
      return { ...state, stats: { ...state.stats, loading: true, error: null } }
    case STATS_FETCH_SUCCESS:
      return { ...state, stats: { ...state.stats, loading: false, data: action.payload } }
    case STATS_FETCH_FAILURE:
      return { ...state, stats: { ...state.stats, loading: false, error: action.payload } }

    default:
      return state
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk))

export {
  AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT, AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILURE,
  USERS_FETCH_REQUEST, USERS_FETCH_SUCCESS, USERS_FETCH_FAILURE,
  STATS_FETCH_REQUEST, STATS_FETCH_SUCCESS, STATS_FETCH_FAILURE,
}

export default store
