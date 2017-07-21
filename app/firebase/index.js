import firebase from 'firebase';

try {
  var config = {
      apiKey: "AIzaSyD6yjoHzt_3GvCtTDJecX4qKF4DypTm2r4",
      authDomain: "guardians-33cbd.firebaseapp.com",
      databaseURL: "https://guardians-33cbd.firebaseio.com",
      projectId: "guardians-33cbd",
      storageBucket: "guardians-33cbd.appspot.com",
      messagingSenderId: "93644014740"
    };

  firebase.initializeApp(config);
} catch (e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;
