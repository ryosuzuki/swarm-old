
let reducer = function (state, action) {
  switch (action.type) {
    case 'INIT_STATE':
      return Object.assign({}, state,
        action.state
      )
    case 'INIT_ROBOT':
      let robot = {}
      robot.id = action.id
      for (let key in action.params) {
        robot[key] = action.params[key]
      }
      return Object.assign({}, state, {
        robots: [
          ...state.robots,
          robot
        ]
      })
    case 'UPDATE_ROBOT':
      return Object.assign({}, state, {
        robots: state.robots.map((robot) => {
          if (robot.id !== action.id) return robot
          return Object.assign({}, robot, action.params)
        })
      })
    case 'UPDATE_CURRENT':
      return Object.assign({}, state, {
        current: action.current
      })
    default:
      return state
  }
}

export default reducer