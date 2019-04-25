/* eslint-disable react/no-multi-comp */

// Module imports
import classnames from 'classnames'
import NextHead from 'next/head'
import PropTypes from 'prop-types'
import React from 'react'





// Local imports
import { Footer } from '.'





// Local constants
const maxDecriptionLength = 50
const maxTitleLength = 50





class PageWrapper extends React.Component {
  constructor (props) {
    super(props)

    /* eslint-disable no-console */
    if (this.props.title.length > maxTitleLength) {
      console.warn(`Page titles should be fewer than 60 characters, preferably closer to 50. This page's title is ${this.props.title.length} characters.`)
    }

    if (this.props.description.length > maxDecriptionLength) {
      console.error(`Page description is too long! The description should be 50-300 characters long, but this page's description is ${this.props.description.length} characters.`)
    }

    if (this.props.description.indexOf('"') !== -1) {
      console.error('Page descriptions shouldn\'t contain double quotes.')
    }
    /* eslint-enable no-console */
  }

  render () {
    const {
      children,
      className,
      description,
      title,
    } = this.props

    const titleClass = title.toLowerCase().replace(/\s/gu, '-')
    const mainClasses = classnames({
      [className]: Boolean(className),
      [titleClass]: true,
      page: true,
      'fade-in': true,
    })

    return (
      <>
        <NextHead>
          <title>{title} | Trezy.com</title>
          <meta property="og:title" content={title} />
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
        </NextHead>

        <main className={mainClasses}>
          {children}

          <Footer />
        </main>
      </>
    )
  }

  static defaultProps = {
    className: '',
    description: 'Blep',
  }

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]).isRequired,
    className: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
  }
}


export { PageWrapper }
