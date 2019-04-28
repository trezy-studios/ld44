// Module imports
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
    slots: PropTypes.array.isRequired,
    verticalAlignment: PropTypes.string,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _renderSlot = (slot, index) => (
    <li key={index}>
      {slot && (
        <span>Item {index + 1}!</span>
      )}
    </li>
  )





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    const {
      horizontalAlignment,
      position,
      slots,
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
          {slots.map(this._renderSlot)}
        </ol>
      </menu>
    )
  }
}





export { Hotbar }
