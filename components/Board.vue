<template>
  <section class="text-center">
    <div class="row">
      <div v-if="hasDefaultPlayers" class="alert alert-warning col-12">
        <p class="mb-0">{{ $t('board.hasDefaultPlayers') }}</p>
      </div>
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
  data () {
    return {
      isMounted: false
    }
  },
  mounted () {
    this.isMounted = true
  },
  computed: {
    winner () {
      return this.$store.state.winner
    },
    turnRange () {
      return Array(this.$store.state.players).fill(1).map((x, y) => x + y)
    },
    hasDefaultPlayers () {
      if (!this.isMounted) return false;
      return Array.from(Object.values(this.$refs)).some(ref => ref[0].name.match(/Player [0-9]+/))
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

      let wins = await this.$localForage.getItem('wins') || {}
      let losses = await this.$localForage.getItem('losses') || {}

      this.turnRange.forEach((turn) => {
        let player = this.$refs['player' + turn][0]

        if (!player.name.match(/Player [0-9]+/)) {
          if (player.score == 0) {
            wins[player.name] = wins[player.name] || 0
            wins[player.name] += 1
          } else {
            losses[player.name] = losses[player.name] || 0
            losses[player.name] += 1
          }
        }

        game.players[turn - 1] = {
          name: player.name,
          score: player.score
        }
      })

      games.unshift(game)
      await this.$localForage.setItem('games', games)
      await this.$localForage.setItem('wins', wins)
      await this.$localForage.setItem('losses', losses)

      alert(this.$t('winnerAnnouncement', { winner: this.winner }))
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
