// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'





// Local imports
import { actions } from '../store'





// Local constants
const mapDispatchToProps = dispatch => bindActionCreators({
  initializeGameState: actions.saves.initializeGameState,
  loadMemories: actions.memories.loadMemories,
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
    loadMemories: PropTypes.func.isRequired,
    saves: PropTypes.object.isRequired,
  }




  /***************************************************************************\
    Local Properties
  \***************************************************************************/

  state = {
    loading: false,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _preload = async () => {
    const {
      initializeGameState,
      loadMemories,
    } = this.props

    await loadMemories()

    initializeGameState()
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    const { saves } = this.props
    const { loading } = this.state

    return (
      <main className="game-menu">
        <header>
          <h1>Cornerstone</h1>
        </header>

        {loading && (
          'Loading...'
        )}

        {!loading && (
          <menu type="toolbar">
            <ul>
              <li>
                <button
                  onClick={this._preload}
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
        )}
      </main>
    )
  }
}





export { TitleScreen }
