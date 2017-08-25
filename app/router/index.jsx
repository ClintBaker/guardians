import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Login from 'app/components/Login.jsx';
import Van from 'app/components/Van.jsx';
import Studio from 'app/components/Studio.jsx';
import Browse from 'app/components/Browse.jsx';
import firebase, {firebaseRef} from 'app/firebase';

var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/');
  }
  next();
};
var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/van');
  }
  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="van" component={Van} onEnter={requireLogin} />
      <Route path="studio" component={Studio} onEnter={requireLogin} />
      <Route path="browse" component={Browse} onEnter={requireLogin} />
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn} />
    </Route>
  </Router>
);
