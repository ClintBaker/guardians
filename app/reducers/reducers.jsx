export var authReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        uid: action.uid
      };
    case 'SIGN_OUT':
      return {};
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
