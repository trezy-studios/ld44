// Module imports
import { library as faLibrary, config as faConfig } from '@fortawesome/fontawesome-svg-core'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import LocalForage from 'localforage'



// Component imports
import { AppLayout } from '../components'
import { initStore } from '../store'
import { isBrowser } from '../helpers'
import * as faIcons from '../helpers/faIconLibrary'





// Style imports
/* eslint-disable import/no-unassigned-import */
import '../css/lib.css'
import '../css/app.css'
/* eslint-enable */





// Configure and populate FontAweomse library
faConfig.autoAddCss = false
faLibrary.add(faIcons)




@withRedux(initStore)
class NextApp extends App {
  componentDidMount () {
    if (isBrowser()) {
      const rootElement = document.querySelector('html');

      (async () => {
        const keysToFill = [
          {
            key: 'memories',
            defaultValue: [],
          },
        ]
        const promises = keysToFill.map(({ key }) => LocalForage.getItem(key))
        const results = await Promise.all(promises)

        results.forEach((value, index) => {
          const { defaultValue, key } = keysToFill[index]

          if (!value) {
            LocalForage.setItem(key, defaultValue)
          }
        })
      })()

      if (!rootElement.classList.contains('animation-ready')) {
        rootElement.classList.add('animation-ready')
      }
    }
  }

  constructor (props) {
    super(props)

    LocalForage.config({
      name: 'Cornerstone',
      storeName: 'webStore',
    })
  }

  /* eslint-disable require-await */
  static async getInitialProps (appProps) {
    return AppLayout.getInitialProps(appProps)
  }
  /* eslint-enable */

  render () {
    const {
      store,
    } = this.props

    return (
      <Container>
        <Provider store={store}>
          <AppLayout {...this.props} />
        </Provider>
      </Container>
    )
  }
}





export default NextApp
