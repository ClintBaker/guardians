import firebase, { firebaseRef } from 'app/firebase';
import { hashHistory } from 'react-router';

export var signOut = () => {
  return {
    type: 'SIGN_OUT'
  }
}

export var startSignOut = () => {
  return (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
      alert('signed out');
      hashHistory.push('/');
      dispatch(signOut());
    }).catch((e) => {

    });
  };
};

export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var startLogin = (email, password) => {
  return (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      dispatch(login(user.uid));
      hashHistory.push('home');
    }).catch((e) => {
      console.log(e);
    });
  };
};

export var startChangeVideoId = (id) => {
  return {
    type: 'CHANGE_VIDEO_ID',
    id
  };
};
