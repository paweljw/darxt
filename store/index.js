export const state = () => ({
  turn: 1,
  players: 2,
  winner: null
})

export const mutations = {
  nextTurn (state) {
    let turn = state.turn + 1
    if (turn > state.players) turn = 1
    state.turn = turn
  },
  win (state, player) {
    state.winner = player
  },
  reset (state) {
    state = { turn: 1, players: 2, winner: null }
  }
}
