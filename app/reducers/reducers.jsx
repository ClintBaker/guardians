export var loginReducer = (state = { email: '', password: '' }, action) => {
  switch(action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.email
      };
    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.password
      };
    case 'LOGIN':
      return {
        email: '',
        password: ''
      };
    case 'LOGOUT':
      return {email: '', password: ''}
    default:
      return state;
  };
};

export var authReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        email: action.email,
        uid: action.uid
      };
    case 'UPDATE_ZIP':
      return {
        ...state,
        zip: action.zip
      };
    default:
      return state;
  };
};

export var messageReducer = (state = {message: null, attr: null}, action) => {
  switch(action.type) {
    case 'SET_MESSAGE':
      return {
        message: action.message,
        attr: action.attr
      };
    default:
      return state;
  };
};
