<template>
  <div :class='"col player " + (current ? "current" : "")'>
    <input type="text" v-model="name" onclick="this.select()" onblur="this.selectionEnd = this.selectionStart" class="player-name"/>
    <div class="score">{{ score }}</div>
    <input type="text" class="throw form-control" placeholder="Wprowadź rzut" :disabled="!current" v-on:keyup.13="submit" :id="'player'+turn+'-throw'">
    <Score v-for="(score, index) in reversedHistory" :score="score" :key="index"></Score>
  </div>
</template>

<script>
import Score from '@/components/Score'

export default {
  props: ['game', 'turn', 'currentTurn'],
  components: {
    Score
  },
  data () {
    return {
      name: 'Gracz ' + this.turn,
      score: parseInt(this.game),
      history: []
    }
  },
  methods: {
    submit (e) {
      let value = parseInt(e.target.value)

      if (this.score >= value) {
        this.score -= value
        this.history.push({ value: value, over: false })
      } else {
        this.history.push({ value: value, over: true })
      }

      e.target.value = ''
      e.target.blur()

      if (this.score == 0) {
        window.localStorage.lastWinners = window.localStorage.lastWinners || []
        this.$root.$emit('won', this.name)
      } else {
        this.$root.$emit('throw')
      }
    }
  },
  computed: {
    reversedHistory () {
      return this.history.slice().reverse()
    },
    current () {
      return this.turn == this.currentTurn
    }
  },
  watch: {
    currentTurn () {
      if (this.currentTurn == this.turn) {
        let element = document.getElementById('player' + this.turn + '-throw')
        element.disabled = false
        element.focus()
      }
    }
  }
}
</script>

<style>
.player-name {
  border: 0px none;
  font-size: 33px;
  font-weight: bold;
  text-align: center;
}

.player {
  border: 1px solid #ccc;
  border-radius: 12px;
  margin: 5px;
  padding: 0px;
}

.current {
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 200, 0, 0.6);
}

.score {
  background: #eee;
  font-size: 45px;
  font-weight: bold;
}

.throw {
  margin-bottom: 10px;
}
</style>
