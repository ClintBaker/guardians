import firebase, { firebaseRef } from 'app/firebase';
import { hashHistory } from 'react-router';

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

export var login = (email, uid, zip) => {
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
      dispatch(setMessage('Logged in', 'success'));
      dispatch(setUserInfo(res.uid));
      hashHistory.push('/main');
    }).catch((e) => {
      return firebase.auth().createUserWithEmailAndPassword(loginObj.email, loginObj.password).then((res) => {
        dispatch(login(res.email, res.uid));
        dispatch(setMessage('Account created.  Thank you valued customer', 'success'));
        hashHistory.push('/main');
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

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      dispatch(logout());
      hashHistory.push('/');
    }).catch((e) => {
      console.log(e);
    });
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export var updateZip = (zip) => {
  return {
    type: 'UPDATE_ZIP',
    zip
  };
};

export var startUpdateZip = (zip) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var zipRef = firebaseRef.child(`users/${uid}`).set({zip});
    return zipRef.then(() => {
      dispatch(updateZip(zip));
    }).catch((e) => {
      dispatch(setMessage('Unable to update zip', 'danger'));
    });
  };
};

export var setUserInfo = (uid) => {
  return (dispatch, getState) => {
    var zipRef = firebaseRef.child(`users/${uid}/zip`);

    return zipRef.once('value').then((snapshot) => {
      var zip = snapshot.val() || null;
      dispatch(updateZip(zip));
    });
  };
};
