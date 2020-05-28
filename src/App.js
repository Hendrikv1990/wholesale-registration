import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import { GlobalStyle } from './assets/Styles'
import Main from './Main'
import rootReducer from './reducers'

const middleware = [thunk]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose,
  ),
)

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Main store={store} />
    </Provider>
  )
}

export default App
