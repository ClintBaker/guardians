import * as redux from 'redux';
import thunk from 'redux-thunk';

import { authReducer, videoReducer, vidReducer, sessionReducer, videoLibraryReducer, navReducer, lazerReducer } from 'reducers';

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    auth: authReducer,
    videoId: videoReducer,
    video: vidReducer,
    room: sessionReducer,
    library: videoLibraryReducer,
    nav: navReducer,
    lazer: lazerReducer
  });


  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
