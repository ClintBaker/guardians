import * as redux from 'redux';
import thunk from 'redux-thunk';

import { authReducer, videoReducer, sessionReducer, videoLibraryReducer } from 'reducers';

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    auth: authReducer,
    videoId: videoReducer,
    room: sessionReducer,
    library: videoLibraryReducer
  });


  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
