
import { union } from 'underscore'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

const reqMiddleware = [ thunk ];

const devTools = window.devToolsExtension ? window.devToolsExtension : f => f;

export default class StoreBuilder {

  constructor(extMiddleware) {
    const allMiddleware = union(extMiddleware, reqMiddleware);

    this.createStore = compose(applyMiddleware(...allMiddleware), devTools)(createStore);
  }

  build(initState = {}) {
    return this.createStore(reducers, initState);
  }

}
