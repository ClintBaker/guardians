import firebase, { firebaseRef } from 'app/firebase';
import { hashHistory } from 'react-router';
import axios from 'axios';

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


// Submit new video id *****

export var submitVideoid = (id) => {
  return (dispatch, getState) => {
    var state = getState();
    firebaseRef.child(`sessions/${state.room.id}`).update({"videoId": id});
  };
};

// Change video id *****

export var startChangeVideoId = (id) => {
  return {
    type: 'CHANGE_VIDEO_ID',
    id
  };
};

// Update my color *****

export var updateMyColor = (color) => {
  return {
    type: 'UPDATE_MY_COLOR',
    color
  };
};

// Update sesh que *****

export var updateSeshQue = (queue) => {
  return {
    type: 'UPDATE_SESH_QUE',
    queue
  };
};

// Join sesh *****

export var joinSesh = (seshId) => {
  return (dispatch, getState) => {

      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }


    dispatch(updateMyColor(color));
    dispatch(updateSession(seshId));
    hashHistory.push('studio');
    firebaseRef.child('sessions/' + seshId + '/messages').on('child_added', (snapshot) => {
      var message = snapshot.val();
      dispatch(handleNewMessage(message));
    });

    firebaseRef.child('sessions/' + seshId + '/videoId').on('value', (snapshot) => {
      var id = snapshot.val();
      dispatch(startChangeVideoId(id));
    });

    firebaseRef.child(`sessions/${seshId}/queue`).on('child_added', (snapshot) => {
      var queue = snapshot.val();
      dispatch(updateSeshQue(queue));
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
    var state = getState();
    firebaseRef.child(`sessions/${roomId}/messages`).push({
      message,
      user: uid,
      time: Date.now(),
      color: `${state.auth.myColor}`
    });
  };
};

export var handleNewMessage = (messageObj) => {
  return {
    type: 'HANDLE_NEW_MESSAGE',
    messageObj
  };
};

// Leave session *****

export var leaveSession = () => {
  return {
    type: 'LEAVE_SESSION'
  };
};

// Get popular videos

export var getPopularVideos = () => {
  return (dispatch, getState) => {

    axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        type: 'video',
        maxResults: 50,
        order: 'relevance',
        q: 'music',
        key: 'AIzaSyBuoT0p85hUEIYMNr_6rdZKxgnpFGmn5Co'
      }
    }).then((res) => {
      dispatch(updateVideoLibrary(res.data.items));
    }).catch((e) => {
      console.log(e);
    });
  };
};

export var updateVideoLibrary = (items) => {
  return {
    type: 'UPDATE_VIDEO_LIBRARY',
    items
  };
};

// Queue video id *****

export var queueVideoId = (id, url, title) => {
  return (dispatch, getState) => {
    var state = getState();
    firebaseRef.child(`sessions/${state.room.id}/queue/${id}`).set({
      id,
      url,
      title
    });
  };
};

//Remove from queue *****

export var removeFromQueue = (id) => {
  return (dispatch, getState) => {
    var state = getState();
    firebaseRef.child(`sessions/${state.room.id}/queue/${id}`).set(null).then(() => {
      firebaseRef.child(`sessions/${state.room.id}/queue`).once('value').then((snapshot) => {
        var queue = snapshot.val();
        var queueArray = Object.keys(queue).map((key) => queue[key]);
        dispatch(updateQueueOnDelete(queueArray));
      });
    });
  };
};

// Update queue on delete *****

export var updateQueueOnDelete = (queue) => {
  return {
    type: 'UPDATE_QUEUE_ON_DELETE',
    queue
  };
};
