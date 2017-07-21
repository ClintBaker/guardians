import firebase from 'app/firebase';

export var setPassword = (password) => {
  return {
    type: 'SET_PASSWORD',
    password
  };
};

export var setEmail = (email) => {
  return {
    type: 'SET_EMAIL',
    email
  };
};

export var login = (email, uid) => {
  return {
    type: 'LOGIN',
    email,
    uid
  };
};

export var startLogin = (loginObj) => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithEmailAndPassword(loginObj.email, loginObj.password).then((res) => {
      dispatch(login(res.email, res.uid));
      dispatch(setMessage('Logged in', 'success'))
    }).catch((e) => {
      return firebase.auth().createUserWithEmailAndPassword(loginObj.email, loginObj.password).then((res) => {
        dispatch(login(res.email, res.uid));
        dispatch(setMessage('Account created.  Thank you valued customer', 'success'));
      }).catch((e) => {
        dispatch(setMessage('Login failed', 'danger'));
      })
    });
  };
};

export var setMessage = (message, attr) => {
  return {
    type: 'SET_MESSAGE',
    message,
    attr
  };
};
