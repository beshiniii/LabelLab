import {
  SET_USER_DATA_FAILURE,
  SET_USER_DATA_REQUEST,
  SET_USER_DATA_SUCCESS,
  UPLOAD_USER_IMAGE_FAILURE,
  UPLOAD_USER_IMAGE_REQUEST,
  UPLOAD_USER_IMAGE_SUCCESS,
  FETCH_COUNT_FAILURE,
  FETCH_COUNT_REQUEST,
  FETCH_COUNT_SUCCESS,
  SEARCH_USER,
  SEARCH_USER_FAILURE,
  EDIT_USER_INFO,
  EDIT_USER_INFO_FAILURE
} from '../constants/index'

import FetchApi from '../utils/FetchAPI'

export const fetchUser = () => {
  return dispatch => {
    dispatch(request())
    FetchApi('GET', '/api/v1/users/info', null, true)
      .then(res => {
        dispatch(success(res.data.body))
      })
      .catch(err => {
        if (err.response) {
          err.response.data
            ? dispatch(failure(err.response.data.msg))
            : dispatch(failure(err.response.statusText, null))
        }
      })
  }
  function request() {
    return { type: SET_USER_DATA_REQUEST }
  }
  function success(data) {
    return { type: SET_USER_DATA_SUCCESS, payload: data }
  }
  function failure(error) {
    return { type: SET_USER_DATA_FAILURE, payload: error }
  }
}

export const uploadImage = (data, callback) => {
  return dispatch => {
    dispatch(request())
    FetchApi('POST', '/api/v1/users/uploadImage', data, true)
      .then(() => {
        dispatch(success())
        callback('true')
      })
      .catch(err => {
        if (err.response) {
          dispatch(failure())
        }
      })
  }
  function request() {
    return { type: UPLOAD_USER_IMAGE_REQUEST }
  }
  function success() {
    return { type: UPLOAD_USER_IMAGE_SUCCESS }
  }
  function failure() {
    return { type: UPLOAD_USER_IMAGE_FAILURE }
  }
}

export const fetchCount = () => {
  return dispatch => {
    dispatch(request())
    FetchApi('GET', '/api/v1/users/fetchCount', null, true)
      .then(res => {
        dispatch(success(res.data.body))
      })
      .catch(err => {
        if (err.response) {
          err.response.data
            ? dispatch(failure(err.response.data.msg))
            : dispatch(failure(err.response.statusText, null))
        }
      })
  }
  function request() {
    return { type: FETCH_COUNT_REQUEST }
  }
  function success(data) {
    return { type: FETCH_COUNT_SUCCESS, payload: data }
  }
  function failure(error) {
    return { type: FETCH_COUNT_FAILURE, payload: error }
  }
}

export const getSearchUser = query => {
  return dispatch => {
    if (!query) {
      query = 'null'
    }
    FetchApi('GET', '/api/v1/users/search/' + query, null, true)
      .then(response => {
        dispatch(success(response.data.body))
      })
      .catch(err => {
        if (err.response) {
          err.response.data
            ? dispatch(
                failure(err.response.data.msg, err.response.data.err_field)
              )
            : dispatch(failure(err.response.statusText, null))
        }
      })
  }
  function success(data) {
    return { type: SEARCH_USER, payload: data }
  }
  function failure(error) {
    return { type: SEARCH_USER_FAILURE, payload: error }
  }
}

export const editUser = (data, callback) => {
  return dispatch => {
    dispatch(request())
    FetchApi('PUT', '/api/v1/users/edit', data, true)
      .then(response => {
        callback()
      })
      .catch(err => {
        if (err.response) {
          err.response.data
            ? dispatch(
                failure(err.response.data.msg, err.response.data.err_field)
              )
            : dispatch(failure(err.response.statusText, null))
        }
      })
  }
  function request() {
    return { type: EDIT_USER_INFO }
  }
  function failure(error) {
    return { type: EDIT_USER_INFO_FAILURE, payload: error }
  }
}
