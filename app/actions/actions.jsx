import firebase, { firebaseRef } from 'app/firebase';
import { hashHistory } from 'react-router';
import axios from 'axios';

// Sign out *****

export var signOut = () => {
  return {
    type: 'SIGN_OUT'
  };
};

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

//Create user *****

export var createUser = (password, email, userName) => {
  return (dispatch, getState) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      firebaseRef.child(`users/${user.uid}`).set({"userName": userName, "email": email}).then(() => {

      }).catch((e) => {
        console.log(e);
      });

      firebaseRef.child(`userReference/emails`).push(email);
      firebaseRef.child(`userReference/userNames`).push(userName);
      dispatch(login(user.uid));
      hashHistory.push('van');
    }).catch((e) => {
      console.log(e);
    });
  };
};

// Login *****

export var login = (uid, email, userName) => {
  return {
    type: 'LOGIN',
    uid,
    email,
    userName
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

// After login *****

export var afterLogin = (email, userName) => {
  return {
    type: 'AFTER_LOGIN',
    email,
    userName
  };
};

// Submit new video id *****

export var submitVideoid = (id, title) => {
  return (dispatch, getState) => {
    var state = getState();
    firebaseRef.child(`sessions/${state.room.id}`).update({"videoId": id, "videoTitle": title});
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

export var updateNav = (comp) => {
  return {
    type: 'UPDATE_NAV',
    comp
  }
}

// Join sesh *****

export var joinSesh = (seshId) => {
  return (dispatch, getState) => {
      dispatch(startLeaveSession());

      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      firebaseRef.child(`sessions/${seshId}`).once('value').then((snapshot) => {
        var snap = snapshot.val();
        var seshName = snap.name;
        dispatch(updateSession(seshId, seshName, snap.chiefName));

        var state = getState();
        if (state.auth.uid === snap.chief) {
          dispatch(setChiefStatus(true));
        } else {
          dispatch(setChiefStatus(false));
        }

      });


    dispatch(updateMyColor(color));
    dispatch(updateNav('studio'));
    var now = Date.now();
    firebaseRef.child('sessions/' + seshId + '/messages').on('child_added', (snapshot) => {
      var message = snapshot.val();
      if (message.time > now) {
        dispatch(handleNewMessage(message));
      } else {

      }
    });

    firebaseRef.child('sessions/' + seshId + '/videoId').on('value', (snapshot) => {
      var id = snapshot.val();
      dispatch(startChangeVideoId(id));
    });

    firebaseRef.child(`sessions/${seshId}/queue`).on('child_added', (snapshot) => {
      var queue = snapshot.val();
      dispatch(updateSeshQue(queue));
    });

    firebaseRef.child(`sessions/${seshId}/videoTitle`).on('value', (snapshot) => {
      var title = snapshot.val();
      dispatch(submitVideoInfo(title));
    });
  };
};

// Create sesh *****

export var createSesh = (seshName, uid, userName) => {
  return (dispatch, getState) => {
    dispatch(startLeaveSession());
    var newSeshName = Date.now() + uid;
    firebaseRef.child('sessions/' + newSeshName).set({
      chief: uid,
      chiefName: userName,
      name: seshName,
      messages: [
        {
          user: 'admin',
          message: 'Chat initiated',
          time: Date.now()
        }
      ]
    }).then(() => {
      dispatch(updateSession(newSeshName, seshName, userName));
      dispatch(updateNav('studio'));
      dispatch(joinSesh(newSeshName));
    }).catch((e) => {
      console.log('unable to create sesh');
    });
  };
};

// Update session *****

export var updateSession = (seshId, seshName, chiefName) => {
  return {
    type: 'UPDATE_SESSION',
    seshId,
    seshName,
    chiefName
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

export var startLeaveSession = () => {
  return (dispatch, getState) => {
    var state = getState();
    var seshId = state.room.id;

    if (seshId) {
      firebaseRef.child('sessions/' + seshId + '/videoId').off();
      firebaseRef.child('sessions/' + seshId + '/messages').off();
      firebaseRef.child('sessions/' + seshId + '/queue').off();
    }

    dispatch(leaveSession());
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
        q: 'Griz',
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
    dispatch(fireLazer());
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

//Get video search *****

export var getVideoSearch = (search) => {
  return (dispatch, getState) => {
    axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        type: 'video',
        maxResults: 50,
        order: 'relevance',
        q: search,
        key: 'AIzaSyBuoT0p85hUEIYMNr_6rdZKxgnpFGmn5Co'
      }
    }).then((res) => {
      dispatch(updateSearch(res.data.items));
    }).catch((e) => {
      console.log(e);
    });
  };
};

//Update search *****

export var updateSearch = (searchItems) => {
  return {
    type: 'UPDATE_SEARCH',
    searchItems
  };
};

//Submit video info *****

export var submitVideoInfo = (title) => {
  return {
    type: 'SUBMIT_VIDEO_INFO',
    title
  };
};

//Set chief status *****

export var setChiefStatus = (bool) => {
  return {
    type: 'SET_CHIEF_STATUS',
    bool
  };
};

export var fireLazer = () => {
  return (dispatch, getState) => {
    dispatch(lazer('true'));
    setTimeout(() => {
      dispatch(lazer('untrue'));
    }, 200);
  };
};

export var lazer = (bool) => {
  return {
    type: 'LAZER',
    bool
  };
};

export var fullTimeLazer = () => {
  return (dispatch, getState) => {
    var state = getState();

    if (state.lazer == 'true') {
      dispatch(lazer('not true'))
    } else {
      dispatch(lazer('true'))
    }
  };
};

// startPlayVideoAndCreateStation *****

export var startPlayVideoAndCreateStation = (id, url, title) => {
  return (dispatch, getState) => {
    var state = getState();

    var stationName = state.auth.userName + ' AutoBot ' + ((Math.random() * 1000).toString());

    dispatch(createSesh(stationName, state.auth.uid, state.auth.userName));
    setTimeout(() => {
      dispatch(submitVideoid(id, title));
      queueVideoId(id, url, title);
    }, 250);
  };
};
