import React, { Component } from 'react'
import * as d3 from 'd3'
import async from 'async'
import 'babel-polyfill'
import Jimp from 'jimp'

class Grid extends Component {

  componentDidMount() {
    window.d3 = d3

    // const canvas = document.getElementById('canvas');
    // const context = canvas.getContext('2d');
    // canvas.width = $('#canvas').innerWidth()
    // canvas.height = $('#canvas').innerWidth()
    // const centerX = canvas.width / 2;
    // const centerY = canvas.height / 2;
    // const radius = 70;
    // context.beginPath();
    // context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    // context.fillStyle = 'green';
    // context.fill()
    // context.strokeStyle = '#000';
    // context.lineWidth = 5;
    // context.strokeStyle = '#000';
    // context.stroke();
  }

  forward(id) {
    if (!id) id = this.props.current
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

  rotate(id) {
    let rotate = this.props.robots[id].rotate
    rotate = (rotate+90) % 360
    this.props.app.updateRotate(id, rotate)
  }

  direct(id, angle = 0) {
    let rotate = this.props.robots[id].rotate
    rotate = angle % 360
    this.props.app.updateRotate(id, rotate)
  }

  init(id) {
    if (!id) id = this.props.current
    this.props.app.updateRotate(id, 0)
  }

  move(id, dx, dy) {
    let cx = this.props.robots[id].row
    let cy = this.props.robots[id].col

    let x = Math.abs(dx-cx)
    let y = Math.abs(dy-cy)
    let ax = (dx-cx >= 0) ? 0 : 180
    let ay = (dy-cy >= 0) ? 90 : 270

    let rows = [...Array(x).keys()]
    let cols = [...Array(y).keys()]

    const command = (type, id, angle) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`command ${type}`)
          if (type === 'direct') this.direct(id, angle)
          if (type === 'forward') this.forward(id)
          console.log(`finish ${type}`)
          resolve()
        }, 100)
      })
    }

    const run = async () => {
      await command('direct', id, ax)
      for (let row of rows) {
        await command('forward', id)
      }
      await command('direct', id, ay)
      for (let col of cols) {
        await command('forward', id)
      }
    }

    run()
  }

  form() {
    var imageData = mini.getImageData(0, 0, row, col)
    let data = imageData.data
    let array = []
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i]
      let g = data[i + 1]
      let b = data[i + 2]
      let a = data[i + 3] / 255
      array.push({ r: r, g: g, b: b, a: a })
    }

    let y = -1
    let positions = array.map((color, index) => {
      let val = color.a // (color.r + color.g + color.b) / 3
      let x = index % row
      if (x === 0) y++
      if (val > 0) {
        return { x: x, y: y, val: val }
      }
    })
    positions = positions.filter(pos => pos)
    window.positions = positions
    window.array = array

    console.log('start')

    if (positions.length === 0) return

    for (let i = 0; i < positions.length; i++) {
      let pos = positions[i]
      if (i < this.props.robots.length) {
        this.move(i, pos.x, pos.y)
      }
    }

    let remains = this.props.robots.length - positions.length
    for (let i = 0; i < remains; i++) {
      let id = this.props.robots.length - i - 1
      this.move(id, 20, 20 - i)
    }
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
          {/*
          <button className="ui basic button" onClick={ this.forward.bind(this) }>Forward</button>
          <button className="ui basic button" onClick={ this.rotate.bind(this) }>Turn Right</button>
          */}
          <button className="ui basic button" onClick={ this.form.bind(this) }>Form</button>
          <canvas id="canvas" style={{ 'width' : '100%', 'margin-top' : '20px' }}></canvas>
          <canvas id="bitmap" style={{ 'width' : '100%', 'margin-top' : '20px' }}></canvas>
        </div>
        <div id="main">
          { this.props.robots.map((robot) => {
            let color = d3.schemeCategory20b[robot.id%20]
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
