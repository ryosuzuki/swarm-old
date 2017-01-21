import React, { Component } from 'react'

class Grid extends Component {

  componentDidMount() {
  }

  forward() {
    let left = this.props.robots.left
    let right = this.props.robots.right
    this.props.app.updatePosition(left+1, right)
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
              'left' : `${unit * this.props.robots.left - margin}px`,
              'top'  : `${unit * this.props.robots.right - margin}px`
            }}></div>
          </table>
        </div>
      </div>
    )
  }

}

export default Grid
