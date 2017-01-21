import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import moment from 'moment'
import actions from '../redux/actions'

import Grid from './Grid'

class App extends Component {

  componentDidMount() {
    window.app = this
    window.moment = moment
    window._ = _

    this.initPosition()
  }

  initPosition() {
    const robots = {
      row: 8,
      col: 8,
      rotate: 0
    }
    this.props.store.dispatch(actions.updateRobots(robots))
  }

  updatePosition(row, col) {
    const robots = Object.assign({}, this.props.robots, {
      row: row,
      col: col,
    })
    this.props.store.dispatch(actions.updateRobots(robots))
  }

  updateRotate(rotate) {
    const robots = Object.assign({}, this.props.robots, {
      rotate: rotate
    })
    this.props.store.dispatch(actions.updateRobots(robots))
  }

  render() {
    return (
      <div>
        <Grid app={ this }
              robots={ this.props.robots }
              store={ this.props.store }
              actions={this.props.actions } />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)