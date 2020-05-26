import {
  SET_SCREAMS,
  SET_PROFILE,
  SET_NEXT_SCREAMS,
  SET_LOADED_ALL,
  SET_LOADED_ALL_COMMENTS,
  SET_SCREAM,
  SET_MORE_COMMENTS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  //LOADING_MORE_DATA,
  //STOP_LOADING_MORE_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT,
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  loading: false,
  loadingMore: false,
  loadedAll: false,
  loadedAllComments: false,
  profile: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    //case LOADING_MORE_DATA:
    //  return {
    //    ...state,
    //    loadingMore: true,
    //  };
    //case STOP_LOADING_MORE_DATA:
    //  return {
    //    ...state,
    //    loadingMore: false,
    //  };
    case SET_SCREAMS:
      if (action.payload.length < 20) {
        return {
          ...state,
          screams: action.payload,
          loading: false,
          loadedAll: true,
        };
      } else {
        return {
          ...state,
          screams: action.payload,
          loading: false,
          loadedAll: false,
        };
      }
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case SET_NEXT_SCREAMS:
      if (action.payload.length < 20) {
        return {
          ...state,
          screams: [...state.screams, ...action.payload],
          loadedAll: true,
        };
      } else {
        return {
          ...state,
          screams: [...state.screams, ...action.payload],
        };
      }
    case SET_LOADED_ALL:
      return {
        ...state,
        loadedAll: action.payload,
      };
    case SET_LOADED_ALL_COMMENTS:
      return {
        ...state,
        loadedAllComments: action.payload,
      };
    case SET_SCREAM:
      if (action.payload.comments.length < 20) {
        return {
          ...state,
          scream: action.payload,
          loadedAllComments: true,
        };
      } else {
        return {
          ...state,
          scream: action.payload,
          loadedAllComments: false,
        };
      }
    case SET_MORE_COMMENTS:
      if (action.payload.comments.length < 20) {
        return {
          ...state,
          scream: {
            ...state.scream,
            comments: [...state.scream.comments, ...action.payload.comments],
          },
          loadedAllComments: true,
        };
      } else {
        return {
          ...state,
          scream: {
            ...state.scream,
            comments: [...state.scream.comments, ...action.payload.comments],
          },
        };
      }
    case LIKE_SCREAM:
    case UNLIKE_SCREAM: {
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        //state.scream = action.payload;
        state.scream.likeCount = action.payload.likeCount;
      }
      return {
        ...state,
      };
    }
    case DELETE_SCREAM: {
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(index, 1);
      return {
        ...state,
      };
    }
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      };
    default:
      return state;
  }
}
