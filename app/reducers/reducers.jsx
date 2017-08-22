export var authReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        uid: action.uid
      };
    case 'SIGN_OUT':
      return {};
    case 'UPDATE_MY_COLOR':
      return {
        ...state,
        myColor: action.color
      }
    default:
      return state;
  };
};

export var videoReducer = (state = 'WslamjoE770', action) => {
  switch(action.type) {
    case 'CHANGE_VIDEO_ID':
      return action.id;
    default:
      return state;
  };
};

export var sessionReducer = (state = {id: null, messages: [], sessions: []}, action) => {
  switch(action.type) {
    case 'UPDATE_SESSION':
      return {
        ...state,
        id: action.seshName
      };
    case 'HANDLE_NEW_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages,
          action.messageObj
        ]
      };
    case 'UPDATE_SESSIONS_LIST':
      return {
        ...state,
        sessions: action.sessionsArray
      };
    case 'LEAVE_SESSION':
      return {
        id: null,
        messages: [],
        sessions: []
      };
    default:
      return state;
  };
};

export var videoLibraryReducer = (state = {queue: []}, action) => {
  switch(action.type) {
    case 'UPDATE_VIDEO_LIBRARY':
      return {
        ...state,
        videos: action.items
      };
    case 'UPDATE_SESH_QUE':
      return {
        ...state,
        queue: [
          ...state.queue,
          action.queue
        ]
      };
    case 'UPDATE_QUEUE_ON_DELETE':
      return {
        ...state,
        queue: [
          ...action.queue
        ]
      };
    case 'LEAVE_SESSION':
      return {
        ...state,
        queue: []
      };
    default:
      return state;
  };
};
