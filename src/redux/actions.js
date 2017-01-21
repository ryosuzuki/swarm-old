let nextId = 0

let actions = {
  initState: function(state) {
    return {
      type: 'INIT_STATE',
      state: state
    }
  },
  initRobot: function(params) {
    return {
      type: 'INIT_ROBOT',
      id: nextId++,
      params: params
    }
  },
  updateRobot: function(id, params) {
    return {
      type: 'UPDATE_ROBOT',
      id: parseInt(id),
      params: params
    }
  },
  updateCurrent: function(current) {
    return {
      type: 'UPDATE_CURRENT',
      current: parseInt(current)
    }
  },
}

export default actions