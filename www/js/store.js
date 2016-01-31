
import { union } from 'underscore'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

const reqMiddleware = [ thunk ];

const devTools = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f;

export default class StoreBuilder {

  constructor(extMiddleware) {
    const all = [ ...reqMiddleware, ...extMiddleware ];

    if(process.env.NODE_ENV === 'development') {

      this.finalCreateStore = compose(
        applyMiddleware(...all),
        devTools
      )(createStore);

    } else {

      this.finalCreateStore = compose(
        applyMiddleware(...all)
      )(createStore);
    }
  }

  build(initState = {}) {
    return this.finalCreateStore(reducers, initState);
  }

}
