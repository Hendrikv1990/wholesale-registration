import React from 'react'
import { IntlProvider } from 'react-intl'
import appStrings from './appStrings'
import { GlobalStyle } from './assets/Styles'
import Main from './Main'
import { flattenMessages } from './modules/flattenMessages'

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
