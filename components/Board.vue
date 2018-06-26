<template>
  <section class="text-center">
    <div class="row">
      <Player :game="game" :turn=1 ref="player1"></Player>
      <Player :game="game" :turn=2 ref="player2"></Player>
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
    }
  },
  watch: {
    winner () {
      if (this.winner === null) return;
      let lastWinners = JSON.parse(window.localStorage.lastWinners || '[]')
      lastWinners.unshift({
        nameOne: this.$refs.player1.name,
        nameTwo: this.$refs.player2.name,
        scoreOne: this.$refs.player1.score,
        scoreTwo: this.$refs.player2.score
      })
      window.localStorage.lastWinners = JSON.stringify(lastWinners)
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
