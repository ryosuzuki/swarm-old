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

    this.initRobots()
  }

  initRobots() {
    this.gridMax = 20
    for (let i = 0; i < 50; i++) {
      const id = i
      const params = {
        row: Math.floor(Math.random() * this.gridMax),
        col: Math.floor(Math.random() * this.gridMax),
        rotate: Math.floor(Math.random() * 3) * 90,
      }
      this.props.store.dispatch(actions.initRobot(params))
    }
  }

  updatePosition(id, row, col) {
    const params = {
      row: row,
      col: col
    }
    this.props.store.dispatch(actions.updateRobot(id, params))
  }

  updateRotate(id, rotate) {
    const params = {
      rotate: rotate
    }
    this.props.store.dispatch(actions.updateRobot(id, params))
  }

  updateCurrent(current) {
    this.props.store.dispatch(actions.updateCurrent(current))
  }

  render() {
    return (
      <div>
        <Grid app={ this }
              robots={ this.props.robots }
              current={ this.props.current }
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