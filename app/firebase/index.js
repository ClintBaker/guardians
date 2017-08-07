import firebase from 'firebase';

try {
  var config = {
      apiKey: "AIzaSyBX5Upzqp49s766Vr0C2drlsrKN6vAA7aM",
      authDomain: "caravan-bbb03.firebaseapp.com",
      databaseURL: "https://caravan-bbb03.firebaseio.com",
      projectId: "caravan-bbb03",
      storageBucket: "caravan-bbb03.appspot.com",
      messagingSenderId: "797209950813"
    };

  firebase.initializeApp(config);
} catch (e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;
