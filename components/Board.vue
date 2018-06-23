<template>
  <section class="text-center">
    <div class="row">
      <Player :game="game" :turn=1 :currentTurn="currentTurn" ref="player1"></Player>
      <Player :game="game" :turn=2 :currentTurn="currentTurn" ref="player2"></Player>
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
      currentTurn: 1
    }
  },
  created () {
    this.$root.$on('throw', this.throwListener)
    this.$root.$on('won', this.winListener)
  },
  beforeDestroy () {
    this.$root.$off('throw', this.throwListener)
    this.$root.$off('won', this.winListener)
  },
  methods: {
    throwListener () {
      let turn = this.currentTurn + 1
      if(turn > 2) { turn = 1 }
      this.currentTurn = turn
    },
    winListener (name) {
      let lastWinners = JSON.parse(window.localStorage.lastWinners || '[]')
      lastWinners.unshift({
        nameOne: this.$refs.player1.name,
        nameTwo: this.$refs.player2.name,
        scoreOne: this.$refs.player1.score,
        scoreTwo: this.$refs.player2.score
      })
      window.localStorage.lastWinners = JSON.stringify(lastWinners)
      alert(name + ' wygrywa!')
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
