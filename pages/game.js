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
import {
  Hotbar,
  TitleScreen,
} from '../components'





// Local constants
const mapDispatchToProps = dispatch => bindActionCreators({
  addHotbar: actions.hotbars.addHotbar,
  setControlState: actions.controls.setControlState,
}, dispatch)
const mapStateToProps = ({
  currentGameStateID,
  hotbars,
  saves,
}) => ({
  currentGameStateID,
  hotbars,
  saves,
})





@connect(mapStateToProps, mapDispatchToProps)
class Game extends React.Component {
  /***************************************************************************\
    Static Properties
  \***************************************************************************/

  static defaultProps = {
    currentGameStateID: '',
  }

  static propTypes = {
    addHotbar: PropTypes.func.isRequired,
    currentGameStateID: PropTypes.string,
    hotbars: PropTypes.object.isRequired,
    saves: PropTypes.object.isRequired,
    setControlState: PropTypes.func.isRequired,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _bindEvents = () => {
    const { setControlState } = this.props

    document.addEventListener('keydown', ({ key }) => {
      console.log('keydown')
      setControlState(key.toLowerCase(), true)
    })

    document.addEventListener('keyup', ({ key }) => {
      console.log('keyup')
      setControlState(key.toLowerCase(), false)
    })
  }

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

    this._bindEvents()
  }

  render () {
    const {
      currentGameStateID,
      hotbars,
    } = this.props

    if (!currentGameStateID) {
      return (
        <TitleScreen />
      )
    }

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
