import React, { Component } from 'react'

class Grid extends Component {

  componentDidMount() {
  }

  render() {
    let rows = []
    let cols = []
    for (let i = 0; i < 30; i++) {
      rows.push(i)
      cols.push(i)
    }
    return (
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
            'left' : `${this.props.robots.left}px`,
            'top'  : `${this.props.robots.right}px`
          }}></div>
        </table>
      </div>
    )
  }

}

export default Grid
