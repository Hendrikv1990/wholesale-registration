import React from 'react'

import Main from './Main'
import { GlobalStyle } from './assets/Styles'
import { IntlProvider } from 'react-intl'
import { flattenMessages } from './modules/flattenMessages'
import appStrings from './appStrings'

const App = ({ locale = 'en' }) => {
  return (
    <IntlProvider
      locale={locale}
      messages={flattenMessages(appStrings[locale])}
    >
      <GlobalStyle />
      <Main />
    </IntlProvider>
  )
}

export default App
