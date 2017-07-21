import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Landing from 'Landing';

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <IndexRoute component={Landing} />
    </Route>
  </Router>
);
