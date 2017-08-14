import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Landing from 'app/components/Landing.jsx';
import Login from 'app/components/Login.jsx';
import Van from 'app/components/Van.jsx';
import Studio from 'app/components/Studio.jsx';

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="home" component={Landing}  />
      <Route path="van" component={Van} />
      <Route path="studio" component={Studio} />
      <IndexRoute component={Login} />
    </Route>
  </Router>
);
