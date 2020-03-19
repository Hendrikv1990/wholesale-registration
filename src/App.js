import React from 'react'
import { IntlProvider } from 'react-intl'
import appStrings from './appStrings'
import { GlobalStyle } from './assets/Styles'
import Main from './Main'
import { flattenMessages } from './modules/flattenMessages'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './filesReducer'

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

const App = ({ locale = 'en' }) => {
  return (
    <Provider store={store}>
      <IntlProvider
        locale={locale}
        messages={flattenMessages(appStrings[locale])}
      >
        <GlobalStyle />
        <Main />
      </IntlProvider>
    </Provider>
  )
}

export default App
