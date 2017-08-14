import firebase, { firebaseRef } from 'app/firebase';
import { hashHistory } from 'react-router';

// Sign out *****

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

// Login *****

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
      hashHistory.push('van');
    }).catch((e) => {
      console.log(e);
    });
  };
};

// Change video id *****

export var startChangeVideoId = (id) => {
  return {
    type: 'CHANGE_VIDEO_ID',
    id
  };
};

// Join sesh *****

export var joinSesh = (seshId) => {
  return (dispatch, getState) => {
    dispatch(updateSession(seshId));
    hashHistory.push('studio');
    firebaseRef.child('sessions/' + seshId + '/messages').on('child_added', (snapshot) => {
      var message = snapshot.val();
      dispatch(handleNewMessage(message));
    });
  };
};

// Create sesh *****

export var createSesh = (seshName, uid) => {
  return (dispatch, getState) => {
    var newSeshName = Date.now() + uid;
    firebaseRef.child('sessions/' + newSeshName).set({
      chief: uid,
      name: seshName,
      messages: [
        {
          user: 'admin',
          message: 'Chat initiated',
          time: Date.now()
        }
      ]
    }).then(() => {
      dispatch(updateSession(newSeshName));
      hashHistory.push('studio');
      firebaseRef.child(`sessions/${newSeshName}/messages`).on('child_added', (snapshot) => {
        var message = snapshot.val();
        dispatch(handleNewMessage(message));
      });
    }).catch((e) => {
      console.log('unable to create sesh');
    });
  };
};

// Update session *****

export var updateSession = (seshName) => {
  return {
    type: 'UPDATE_SESSION',
    seshName
  };
};

export var getSessions = () => {
  return (dispatch, getState) => {
    firebaseRef.child('sessions').once('value').then((snapshot) => {
      var sessions = snapshot.val();

      var sessionsArray = [];
      Object.keys(sessions).forEach((session) => {
        sessions[session].id = session;
        sessionsArray.push(sessions[session]);
      });

      dispatch(updateSessionsList(sessionsArray));
    });
  };
};

// Update sessions list *****

export var updateSessionsList = (sessionsArray) => {
  return {
    type: 'UPDATE_SESSIONS_LIST',
    sessionsArray
  };
};

// Send message *****

export var sendMessage = (message, uid, roomId) => {
  return (dispatch, getState) => {
    firebaseRef.child(`sessions/${roomId}/messages`).push({
      message,
      user: uid,
      time: Date.now()
    });
  };
};

export var handleNewMessage = (messageObj) => {
  return {
    type: 'HANDLE_NEW_MESSAGE',
    messageObj
  };
};
