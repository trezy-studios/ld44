// Module imports
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'





class Hotbar extends React.Component {
  /***************************************************************************\
    Static Properties
  \***************************************************************************/

  static defaultProps = {
    horizontalAlignment: 'middle',
    position: 'horizontal',
    verticalAlignment: 'bottom',
  }

  static propTypes = {
    horizontalAlignment: PropTypes.string,
    position: PropTypes.string,
    verticalAlignment: PropTypes.string,
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidMount () {
    console.log('blep')
  }

  render () {
    const {
      horizontalAlignment,
      position,
      verticalAlignment,
    } = this.props

    return (
      <menu
        className="hotbar"
        data-position={position}
        data-horizontal-alignment={horizontalAlignment}
        data-vertical-alignment={verticalAlignment}
        type="toolbar">
        <ol className="grid columns-5">
          <li>Item!</li>
          <li>Item!</li>
          <li>Item!</li>
          <li>Item!</li>
          <li>Item!</li>
        </ol>
      </menu>
    )
  }
}





export { Hotbar }
