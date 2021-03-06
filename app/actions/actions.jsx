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
      firebaseRef.child(`users/${user.uid}`).set({"userName": userName, "email": email, "uid": user.uid}).then(() => {

      }).catch((e) => {
        console.log(e);
      });

      firebaseRef.child(`userReference/emails`).push(email);
      firebaseRef.child(`userReference/userNames`).push(userName);
      dispatch(login(user.uid, email, userName));
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
      dispatch(login(user.uid, email, user.userName));
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

// updateSeshCount *****

export var updateSeshCount = (seshId, userId) => {
  return (dispatch, getState) => {
    firebaseRef.child(`sessions/${seshId}/views/${userId}`).set({ user: userId });
  };
};

// isLive *****

export var isLive = (id, oldRoom) => {
  return (dispatch, getState) => {

    if (oldRoom != null) {
      var state = getState();
      var uid = state.auth.uid;
      firebaseRef.child(`sessions/${oldRoom}`).update({ isLive: false });  
    }
    firebaseRef.child(`sessions/${id}`).update({ isLive: true });
  };
};

// Join sesh *****

export var joinSesh = (seshId) => {
  return (dispatch, getState) => {
    var state = getState();
    var oldRoom = state.room.id;
      dispatch(startLeaveSession());

      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      firebaseRef.child(`sessions/${seshId}`).once('value').then((snapshot) => {
        var snap = snapshot.val();
        var seshName = snap.name;
        var state = getState();
        dispatch(updateSession(seshId, seshName, snap.chiefName));
        dispatch(updateSeshCount(seshId, state.auth.uid))

        var state = getState();
        if (state.auth.uid === snap.chief) {
          dispatch(setChiefStatus(true));
          dispatch(isLive(seshId, oldRoom));
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

    firebaseRef.child(`sessions/${seshId}`).on('value', (snapshot) => {
      var session = snapshot.val();
      dispatch(submitVideoInfo(session.videoTitle, session.views));
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
      isLive: true,
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

    firebaseRef.child(`users/${uid}/sessions/${seshName}`).set({ id: seshName });
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

export var submitVideoInfo = (title, views) => {
  return {
    type: 'SUBMIT_VIDEO_INFO',
    title,
    views
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

    var stationName = prompt('what should we name the station?');

    dispatch(createSesh(stationName, state.auth.uid, state.auth.userName));
    setTimeout(() => {
      dispatch(submitVideoid(id, title));
      queueVideoId(id, url, title);
    }, 250);
  };
};

// startAddToLibrary *****

export var startAddToLibrary = (id, url, title) => {
  return (dispatch, getState) => {
    var state = getState();

    firebaseRef.child(`users/${state.auth.uid}/library`).push({
      id,
      url,
      title
    }).then(() => {
      dispatch(fireLazer());
    }).catch((e) => {
      console.log(e);
    });
  }
};

export var getMyLibrary = () => {
  return (dispatch, getState) => {
    var state = getState();

    if (state.auth.myLibrary.length == 0) {
      firebaseRef.child(`users/${state.auth.uid}/library`).on('child_added', (snapshot) => {
        var newLibraryItemObj = snapshot.val();
        dispatch(updateMyLibrary(newLibraryItemObj));
      });
    }
  };
};

export var updateMyLibrary = (obj) => {
  return {
    type: 'UPDATE_MY_LIBRARY',
    obj
  };
};

// getUsers *****

export var getUsers = () => {
  return (dispatch, getState) => {
    firebaseRef.child(`users`).once('value').then((snapshot) => {
      var usersArray = [];
      var usersObj = snapshot.val();
      Object.keys(usersObj).forEach((key) => {
        usersArray.push(usersObj[key]);
      });
      dispatch(updateUsers(usersArray));
    });
  };
};

// updateUsers *****

export var updateUsers = (users) => {
  return {
    type: 'UPDATE_USERS',
    users
  };
};

// updateUserProfile *****

export var updateUserProfile = (userName, email, library) => {
  return {
    type: 'UPDATE_USER_PROFILE',
    userName,
    email,
    library
  };
};

// startAddFriend *****

export var startAddFriend = (user) => {
  return (dispatch, getState) => {
    var uid;
    if (user.uid) {
      uid = user.uid
    } else {
      uid = null;
    }
    var state = getState();
    firebaseRef.child(`users/${state.auth.uid}/friends/${user.userName}`).set({ email: user.email, userName: user.userName, uid });
  };
};

// getFriends *****

export var getFriends = () => {
  return (dispatch, getState) => {
    var state = getState();

    firebaseRef.child(`users/${state.auth.uid}/friends`).once('value').then((snapshot) => {
      var friendsArray = [];
      var friends = snapshot.val();
      Object.keys(friends).map((key) => {
        friendsArray.push(friends[key]);
      });
      dispatch(updateFriends(friendsArray));
    });
  };
};

// updateFriends *****

export var updateFriends = (friends) => {
  return {
    type: 'UPDATE_FRIENDS',
    friends
  };
};
