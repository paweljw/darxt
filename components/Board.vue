<template>
  <section class="text-center">
    <div class="row">
      <Player v-for="turn in Array($store.state.players).fill(1).map((x, y) => x + y)" :key="turn" :game="game"
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
