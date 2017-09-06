export var authReducer = (state = { myLibrary: [] }, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        uid: action.uid
      };
    case 'AFTER_LOGIN':
      return {
        ...state,
        email: action.email,
        userName: action.userName
      };
    case 'SIGN_OUT':
      return {};
    case 'UPDATE_MY_COLOR':
      return {
        ...state,
        myColor: action.color
      }
    case 'UPDATE_MY_LIBRARY':
      return {
        ...state,
        myLibrary: [
          ...state.myLibrary,
          action.obj
        ]
      };
    default:
      return state;
  };
};

export var videoReducer = (state = '', action) => {
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
        title: action.title,
        views: action.views
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
        name: action.seshName,
        chiefName: action.chiefName
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
    case 'SET_CHIEF_STATUS':
      return {
        ...state,
        isChief: action.bool
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

export var lazerReducer = (state = 'false', action) => {
  switch(action.type) {
    case 'LAZER':
      return action.bool;
    default:
      return state;
  };
};

export var usersReducer = (state = [], action) => {
  switch(action.type) {
    case 'UPDATE_USERS':
      return action.users;
    default:
      return state;
  };
};

export var userInfoReducer = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_USER_PROFILE':
      return {
        userName: action.userName,
        email: action.email,
        library: action.library
      };
    default:
      return state;
  };
};
