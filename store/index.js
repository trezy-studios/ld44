// Moduel imports
import { configureStore } from 'redux-starter-kit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'





// Local imports
import * as actions from './actions'
import rootReducer from './reducers'
import initialState from './initialState'





// Local constants
let store = null





const initStore = preloadedState => {
  if (!store) {
    store = configureStore({
      middleware: [thunk, logger],
      preloadedState: {
        ...initialState,
        ...preloadedState,
      },
      reducer: rootReducer,
    })
  }

  if (module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}

const connectNonReactComponent = ConnectedItem => {
  if (!store) {
    initStore()
  }

  return class extends ConnectedItem {
    /* eslint-disable class-methods-use-this */
    get state () {
      return store.getState()
    }

    get store () {
      return store
    }
    /* eslint-enable */
  }
}



export {
  actions,
  connectNonReactComponent,
  initStore,
}
