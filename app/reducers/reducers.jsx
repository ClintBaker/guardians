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
    case 'LEAVE_SESSION':
      return 'WslamjoE770';
    default:
      return state;
  };
};

export var vidReducer = (state = {id: '', title: ''}, action) => {
  switch(action.type) {
    case 'CHANGE_VIDEO_ID':
      return {
        ...state,
        id: action.id
      };
    case 'SUBMIT_VIDEO_INFO':
      return {
        ...state,
        title: action.title
      };
    default:
      return state;
  };
};

export var sessionReducer = (state = {id: null, messages: [], sessions: []}, action) => {
  switch(action.type) {
    case 'UPDATE_SESSION':
      return {
        ...state,
        id: action.seshId,
        name: action.seshName
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
        ...state,
        id: null,
        messages: [],
        name: ''
      };
    default:
      return state;
  };
};

export var navReducer = (state = 'van', action) => {
  switch(action.type) {
    case 'UPDATE_NAV':
      return action.comp;
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
    case 'UPDATE_SEARCH':
      return {
        ...state,
        searchItems: action.searchItems
      };
    default:
      return state;
  };
};
