import React, { Component } from 'react'
import * as d3 from 'd3'
import async from 'async'
import 'babel-polyfill'

class Grid extends Component {

  componentDidMount() {
    window.d3 = d3
  }

  forward() {
    const id = this.props.current
    let row = this.props.robots[id].row
    let col = this.props.robots[id].col
    const rotate = this.props.robots[id].rotate
    if (rotate === 0) {
      row = (row+1 <= this.props.app.gridMax) ? row+1 : row
    }
    if (rotate === 90) {
      col = (col+1 <= this.props.app.gridMax) ? col+1 : col
    }
    if (rotate === 180) {
      row = (row-1 >= 0) ? row-1 : row
    }
    if (rotate === 270) {
      col = (col-1 >= 0) ? col-1 : col
    }
    this.props.app.updatePosition(id, row, col)
  }

  rotate() {
    const id = this.props.current
    let rotate = this.props.robots[id].rotate
    rotate = (rotate+90) % 360
    this.props.app.updateRotate(id, rotate)
  }

  init() {
    const id = this.props.current
    this.props.app.updateRotate(id, 0)
  }

  move() {
    console.log(x)
    const id = this.props.current

    let x = 20
    let y = 20

    let cx = this.props.robots[id].row
    let cy = this.props.robots[id].col

    let mx = x - cx
    let my = y - cy

    let rows = []
    for (let i = 0; i < mx; i++) {
      rows.push(i)
    }
    let cols = []
    for (let i = 0; i < my; i++) {
      cols.push(i)
    }

    let commands = []
    commands.push('init')
    for (let i = 0; i < mx; i++) {
      commands.push('forward')
    }
    commands.push('rotate')
    for (let i = 0; i < my; i++) {
      commands.push('forward')
    }

    const wait = (command) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`command ${command}`)
          if (command === 'init') {
            this.init()
          }
          if (command === 'forward') {
            this.forward()
          }
          if (command === 'rotate') {
            this.rotate()
          }
          console.log(`finish ${command}`)
          resolve()
        }, 100)
      })
    }

    const run = async () => {
      await wait('init')
      for (let row of rows) {
        await wait('forward')
      }
      await wait('rotate')
      for (let col of cols) {
        await wait('forward')
      }
    }

    run()


    // run()

    // commands.reduce((promise, command) => {
    //   return promise.then(res => wait(command))
    // }, Promise.resolve())

  }


  changeTarget(event) {
    const current = parseInt(event.target.value)
    this.props.app.updateCurrent(current)
  }

  render() {
    let rows = []
    let cols = []
    for (let i = 0; i < this.props.app.gridMax; i++) {
      rows.push(i)
      cols.push(i)
    }
    const unit = 30
    const margin = 10
    return (
      <div>
        <div id="sidebar">
          <form className="ui form">
            <div className="field">
              <label>ID</label>
              <select className="ui fluid dropdown" onChange={ this.changeTarget.bind(this) }>
                { this.props.robots.map((robot) => {
                  return (
                    <option key={ robot.id } value={ robot.id }>
                      { robot.id }
                    </option>
                  )
                })}
              </select>
            </div>
          </form>
          <br />
          <button className="ui basic button" onClick={ this.forward.bind(this) }>Forward</button>
          <button className="ui basic button" onClick={ this.rotate.bind(this) }>Turn Right</button>
          <button className="ui basic button" onClick={ this.move.bind(this) }>Move</button>
        </div>
        <div id="main">
          { this.props.robots.map((robot) => {
            let color = d3.schemeCategory20b[robot.id]
            if (this.props.current === robot.id) {
              color = 'red'
            }
            return (
              <div className="robot" key={robot.id} style={{
                'background': color,
                'left' : `${unit * robot.row - margin}px`,
                'top'  : `${unit * robot.col - margin}px`,
                'transform': `rotate(${robot.rotate}deg)`
              }}>
                { robot.id }
              </div>
            )
          })}
          <table id="grid" className="">
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
          </table>
        </div>
      </div>
    )
  }

}

export default Grid
