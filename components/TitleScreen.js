// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'





// Local imports
import { actions } from '../store'
import { PageWrapper } from '.'





// Local constants
const mapDispatchToProps = dispatch => bindActionCreators({
  initializeGameState: actions.saves.initializeGameState,
}, dispatch)
const mapStateToProps = ({ saves }) => ({ saves })





@connect(mapStateToProps, mapDispatchToProps)
class TitleScreen extends React.Component {
  /***************************************************************************\
    Static Properties
  \***************************************************************************/

  static defaultProps = {}

  static propTypes = {
    initializeGameState: PropTypes.func.isRequired,
    saves: PropTypes.object.isRequired,
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    const {
      initializeGameState,
      saves,
    } = this.props

    return (
      <PageWrapper title="Game Menu">
        <header>
          <h1>Cornerstone</h1>
        </header>

        <menu type="toolbar">
          <ul>
            <li>
              <button
                onClick={initializeGameState}
                type="button">
                New Game
              </button>
            </li>
            <li>
              <button
                disabled={!Object.values(saves).length}
                type="button">
                Load Game
              </button>
            </li>
            <li>
              <button type="button">
                Settings
              </button>
            </li>
          </ul>
        </menu>
      </PageWrapper>
    )
  }
}





export { TitleScreen }
