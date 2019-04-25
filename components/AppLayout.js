// Module imports
import Error from 'next/error'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import React from 'react'
import Router from 'next/router'





// Component imports
// import { Banner } from '.'
import { getHTTPStatusCode } from '../helpers'





NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeStart', () => NProgress.done())
Router.events.on('routeChangeComplete', () => NProgress.done())





class AppLayout extends React.Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  static propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object.isRequired,
    statusCode: PropTypes.number.isRequired,
  }

  static async getInitialProps ({ Component, ctx }) {
    const {
      asPath,
      isServer,
      query,
    } = ctx

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    let statusCode = getHTTPStatusCode('success').code

    if (ctx.res) {
      ({ statusCode } = ctx.res)
    }

    return {
      namespacesRequired: ['common'],
      pageProps: {
        asPath,
        isServer,
        namespacesRequired: ['common'],
        query,
        ...pageProps,
      },
      statusCode,
    }
  }

  render () {
    const {
      Component,
      pageProps,
      statusCode,
    } = this.props
    const successStatusCode = getHTTPStatusCode('success').code

    return (
      <div role="application">
        {(statusCode === successStatusCode) && (
          <Component {...pageProps} />
        )}

        {(statusCode !== successStatusCode) && (
          <main className="fade-in page error">
            <div className="page-content">
              <Error statusCode={statusCode} />
            </div>
          </main>
        )}
      </div>
    )
  }
}




export { AppLayout }
