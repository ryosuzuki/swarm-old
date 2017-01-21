
let reducer = function (state, action) {
  switch (action.type) {
    case 'INIT_STATE':
      return Object.assign({}, state,
        action.state
      )
    case 'UPDATE_ROBOTS':
      return Object.assign({}, state, {
        robots: action.robots
      })
    default:
      return state
  }
}

export default reducer