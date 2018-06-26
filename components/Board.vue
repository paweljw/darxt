<template>
  <section class="text-center">
    <div class="row">
      <Player v-for="turn in turnRange" :key="turn" :game="game"
        :turn="turn" :ref="'player' + turn"></Player>
    </div>
  </section>
</template>

<script>
import Player from '@/components/Player.vue'

export default {
  props: ['game'],
  components: {
    Player
  },
  created () {
    this.$root.$on('won', this.winListener)
  },
  beforeDestroy () {
    this.$root.$off('won', this.winListener)
  },
  computed: {
    winner () {
      return this.$store.state.winner
    },
    turnRange () {
      return Array(this.$store.state.players).fill(1).map((x, y) => x + y)
    }
  },
  watch: {
    async winner () {
      if (this.winner === null) return;

      let games = await this.$localForage.getItem('games')
      games = games || []

      let game = {
        date: new Date(),
        game: this.game,
        players: []
      }

      this.turnRange.forEach((turn) => {
        let player = this.$refs['player' + turn][0]
        game.players[turn - 1] = {
          name: player.name,
          score: player.score
        }
      })

      console.log(game)

      games.unshift(game)
      await this.$localForage.setItem('games', games)

      alert(this.winner + ' wygrywa!')
      this.$store.commit('reset')
      this.$router.push('/')
    }
  }
}
</script>

<style>
section {
  margin-top: 20px;
}
</style>
