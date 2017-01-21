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
      left: 8,
      right: 8
    }
    this.props.store.dispatch(actions.updateRobots(robots))
  }

  updatePosition(left, right) {
    const robots = {
      left: left,
      right: right
    }
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