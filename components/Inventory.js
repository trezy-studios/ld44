// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'





// Local imports
import { actions } from '../store'





// Local constants
const mapDispatchToProps = dispatch => bindActionCreators({
  addItem: actions.inventory.addItem,
}, dispatch)
const mapStateToProps = ({ inventory }) => ({ inventory })





@connect(mapStateToProps, mapDispatchToProps)
class Inventory extends React.Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired,
    inventory: PropTypes.object.isRequired,
  }

  render () {
    return (
      <div>
        <h3>Inventory</h3>

        <button
          onClick={() => this.props.addItem({
            name: 'Log',
            quantity: 10,
            weight: 3,
          })}
          type="button">
          Add Logs
        </button>

        <button
          onClick={() => this.props.addItem({
            name: 'not-Log',
            quantity: 10,
            weight: 3,
          })}
          type="button">
          Add not-Logs
        </button>

        {console.log(this.props.inventory.items)}

        <ul>
          {this.props.inventory.items.map(item => (
            <li key={Math.random()}>
              {console.log(item)}
              <pre>{JSON.stringify(item, null, 2)}</pre>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}





export { Inventory }
