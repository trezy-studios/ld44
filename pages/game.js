// Module imports
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import React from 'react'





// Local imports
import {
  actions,
} from '../store'
import { isBrowser } from '../helpers'
import { Hotbar } from '../components'





// Local constants
const mapDispatchToProps = dispatch => bindActionCreators({
  addHotbar: actions.hotbars.addHotbar,
}, dispatch)
const mapStateToProps = ({ hotbars }) => ({ hotbars })





@connect(mapStateToProps, mapDispatchToProps)
class Game extends React.Component {
  /***************************************************************************\
    Static Properties
  \***************************************************************************/

  static propTypes = {
    addHotbar: PropTypes.func.isRequired,
    hotbars: PropTypes.object.isRequired,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _renderHotbar = hotbar => (
    <Hotbar
      key={hotbar.id}
      {...hotbar} />
  )





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidMount () {
    const {
      addHotbar,
      hotbars,
    } = this.props

    if (!Object.values(hotbars).length) {
      addHotbar('middle', 'bottom', 5)
    }
  }

  render () {
    const { hotbars } = this.props

    if (isBrowser()) {
      /* eslint-disable global-require */
      const { GameComponent } = require('../components/GameComponent')
      /* eslint-enable */

      return (
        <>
          <GameComponent />
          {Object.values(hotbars).map(this._renderHotbar)}
        </>
      )
    }

    return null
  }
}





export default Game
