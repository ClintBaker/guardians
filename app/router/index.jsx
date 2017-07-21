import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import firebase from 'app/firebase/index';
import * as actions from 'actions';

import Landing from 'Landing';
import Main from 'app/components/Main';

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     hashHistory.push('/main');
//   } else {
//     hashHistory.push('/');
//   }
// });

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="main" component={Main} />
      <IndexRoute component={Landing} />
    </Route>
  </Router>
);
