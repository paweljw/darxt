export const state = () => ({
  list: []
})

export const mutations = {
  throw (state, { player, score }) {
    state.list[player] = state.list[player] || []
    state.list[player].unshift(score)
  },
  reset (state) {
    state.list = []
  }
}
