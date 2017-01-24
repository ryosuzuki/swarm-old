import React, { Component } from 'react'
import * as d3 from 'd3'
import async from 'async'
import 'babel-polyfill'
import Jimp from 'jimp'

class Grid extends Component {

  componentDidMount() {
    window.d3 = d3
  }

  start(event) {
    this.fuga()
  }

  fuga() {
    const path = '/circle.png'
    Jimp.read(path, (err, img) => {
      if (err) throw err
      img.resize(10, 10)
      .greyscale()

      var hoge = img.clone()
      const width = img.bitmap.width
      const height = img.bitmap.height

      let array = []
      hoge.scan(0, 0, width, height, function(x, y, idx) {
        let r = this.bitmap.data[idx + 0]
        let g = this.bitmap.data[idx + 1]
        let b = this.bitmap.data[idx + 2]
        let a = this.bitmap.data[idx + 3]

        let value = (r + g + b) / 3
        if (value > 250) {
          array.push({ x: x, y: y, value: value })
        }
      })
      console.log(array.length)
    })
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
    if (!id) id = this.props.current
    let rotate = this.props.robots[id].rotate
    rotate = (rotate+90) % 360
    this.props.app.updateRotate(id, rotate)
  }

  init(id) {
    if (!id) id = this.props.current
    this.props.app.updateRotate(id, 0)
  }

  move(id, dx, dy) {
    id = id || 3 //this.props.current

    dx = dx || 20
    dy = dy || 20
    let cx = this.props.robots[id].row
    let cy = this.props.robots[id].col

    let rows = [...Array(dx-cx).keys()]
    let cols = [...Array(dy-cy).keys()]

    const command = (type, id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`command ${type}`)
          if (type === 'init') this.init(id)
          if (type === 'forward') this.forward(id)
          if (type === 'rotate') this.rotate(id)
          console.log(`finish ${type}`)
          resolve()
        }, 100)
      })
    }

    const run = async () => {
      await command('init', id)
      for (let row of rows) {
        await command('forward', id)
      }
      await command('rotate', id)
      for (let col of cols) {
        await command('forward', id)
      }
    }

    run()

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
          {/*
          <button className="ui basic button" onClick={ this.forward.bind(this) }>Forward</button>
          <button className="ui basic button" onClick={ this.rotate.bind(this) }>Turn Right</button>
          */}
          <button className="ui basic button" onClick={ this.start.bind(this) }>Move</button>
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
