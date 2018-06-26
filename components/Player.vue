<template>
  <div :class='"col player " + (current ? "current" : "")'>
    <input type="text" v-model="name" :autofocus="turn == 1" :tabindex="turn" onclick="this.select()"
      onblur="this.selectionEnd = this.selectionStart" class="player-name"/>
    <div class="score">{{ score }}</div>
    <input type="text" class="throw form-control" :placeholder="$t('player.enterThrow')" :disabled="!current"
      v-on:keyup.13="submit" :id="'player'+turn+'-throw'">
    <Throw v-for="(score, index) in $store.state.throws.list[turn]" :score="score" :key="index"></Throw>
  </div>
</template>

<script>
import Throw from '@/components/Throw'

export default {
  props: ['game', 'turn'],
  components: {
    Throw
  },
  data () {
    return {
      name: this.$t('player.playerTemplate', { num: this.turn }),
      score: parseInt(this.game),
    }
  },
  methods: {
    async submit (e) {
      let value = parseInt(e.target.value)
      await this.recordScore(value)
      this.checkWinCondition()
    },
    async recordScore (value) {
      if (this.score >= value) {
        this.score -= value
        await this.recordThrowAverage(value)
        this.$store.commit('throws/throw', { player: this.turn, score: { value: value, over: false } })
      } else {
        this.$store.commit('throws/throw', { player: this.turn, score: { value: value, over: true } })
      }
    },
    checkWinCondition () {
      if (this.score == 0) {
        this.$store.commit('throws/reset')
        this.$store.commit('win', this.name)
      } else {
        this.$store.commit('nextTurn')
      }
    },
    async recordThrowAverage (value) {
      if (this.name.match(/Player [0-9]+/)) return;

      let throws = await this.$localForage.getItem('throws') || {}
      if (throws[this.name]) {
        throws[this.name] = (throws[this.name] + value) / 2
      } else {
        throws[this.name] = value
      }

      await this.$localForage.setItem('throws', throws)
    }
  },
  computed: {
    current () {
      return this.$store.state.turn == this.turn
    }
  },
  watch: {
    current () {
      let element = document.getElementById('player' + this.turn + '-throw')
      if (this.current) {
        element.disabled = false
        element.focus()
      } else {
        element.value = ''
        element.blur()
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
