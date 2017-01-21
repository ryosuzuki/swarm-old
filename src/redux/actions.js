let actions = {
  initState: function(state) {
    return {
      type: 'INIT_STATE',
      state: state
    }
  },
  updateRobots: function(robots) {
    return {
      type: 'UPDATE_ROBOTS',
      robots: robots
    }
  },
}

export default actions