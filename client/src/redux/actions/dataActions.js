import {
  SET_SCREAMS,
  SET_PROFILE,
  SET_NEXT_SCREAMS,
  LOADING_DATA,
  SET_LOADED_ALL,
  SET_LOADED_ALL_COMMENTS,
  //LOADING_MORE_DATA,
  //STOP_LOADING_MORE_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  SET_ERRORS,
  POST_SCREAM,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_SCREAM,
  SET_MORE_COMMENTS,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from '../types';
import axios from 'axios';

//Get 10 screams
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('./screams')
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
    });
};

export const getNextScreams = (createdAt) => (dispatch) => {
  //dispatch({
  //  type: LOADING_MORE_DATA,
  //});
  axios
    .get(`./screams/${createdAt}`)
    .then((res) => {
      dispatch({
        type: SET_NEXT_SCREAMS,
        payload: res.data,
      });
      //dispatch({
      //  type: STOP_LOADING_MORE_DATA,
      //});
    })
    .catch((err) => {
      dispatch({
        type: SET_NEXT_SCREAMS,
        payload: [],
      });
    });
};

export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data,
      });

      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
export const getMoreComments = (screamId, createdAt) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/${createdAt}`)
    .then((res) => {
      dispatch({
        type: SET_MORE_COMMENTS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/scream', newScream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Like a Scream
export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Unlike a scream
export const unlikeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
// Submit a comment
export const submitComment = (screamId, commentData) => (dispatch) => {
  axios
    .post(`/scream/${screamId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({ type: DELETE_SCREAM, payload: screamId });
    })
    .catch((err) => console.log(err));
};

export const getUserScreams = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams,
      });
      dispatch({
        type: SET_PROFILE,
        payload: res.data.user,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: null,
      });
    });
};

export const getMoreUserScreams = (userHandle, createdAt) => (dispatch) => {
  axios
    .get(`/user/${userHandle}/${createdAt}`)
    .then((res) => {
      dispatch({
        type: SET_NEXT_SCREAMS,
        payload: res.data.screams,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: null,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const setLoadedAll = (loaded) => (dispatch) => {
  dispatch({ type: SET_LOADED_ALL, payload: loaded });
};

export const setLoadedAllComments = (loaded) => (dispatch) => {
  dispatch({ type: SET_LOADED_ALL_COMMENTS, payload: loaded });
};
