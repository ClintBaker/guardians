import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Landing from 'app/components/Landing.jsx';
import Login from 'app/components/Login.jsx';

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="home" component={Landing}  />
      <IndexRoute component={Login} />
    </Route>
  </Router>
);
