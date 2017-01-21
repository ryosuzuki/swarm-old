import React, { Component } from 'react'

class Grid extends Component {

  componentDidMount() {
  }

  forward() {
    let row = this.props.robots.row
    let col = this.props.robots.col
    const rotate = this.props.robots.rotate
    if (rotate === 0) {
      row = row+1
    }
    if (rotate === 90) {
      col = col+1
    }
    if (rotate === 180) {
      row = row-1
    }
    if (rotate === 270) {
      col = col-1
    }
    this.props.app.updatePosition(row, col)
  }

  rotate() {
    let rotate = this.props.robots.rotate
    rotate = (rotate+90) % 360
    this.props.app.updateRotate(rotate)
  }

  render() {
    let rows = []
    let cols = []
    for (let i = 0; i < 30; i++) {
      rows.push(i)
      cols.push(i)
    }
    const unit = 30
    const margin = 8
    return (
      <div>
        <div id="sidebar">
          <button className="ui basic button" onClick={ this.forward.bind(this) }>Forward</button>
          <button className="ui basic button" onClick={ this.rotate.bind(this) }>Turn Right</button>
        </div>
        <div id="main">
          <table id="calendar" className="">
            <tbody>
              { rows.map((row) => {
                return (
                  <tr key={ row }>
                    { cols.map((col) => {
                      return (
                        <td key={ col }>
                        </td>
                      )
                    }) }
                  </tr>
                )
              }) }
            </tbody>

            <div className="robot" style={{
              'left' : `${unit * this.props.robots.row - margin}px`,
              'top'  : `${unit * this.props.robots.col - margin}px`,
              'transform': `rotate(${this.props.robots.rotate}deg)`
            }}></div>
          </table>
        </div>
      </div>
    )
  }

}

export default Grid
