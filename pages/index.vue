<template>
  <div class="container">
    <div class="row">
      <div class="col text-center">
        <img src="/darts.png" class="logo">
        <h1>Wybierz rodzaj rozgrywki</h1>
        <div class="form-group form-horizontal col-xs-12 col-md-6 offset-md-3">
          <label for="players">Liczba graczy: </label>
          <input name="players" id="players" class="form-control" type="number" :value="$store.state.players" min="2"
            max="4" @change="setPlayers">
        </div>
        <router-link to="/301" class="btn btn-primary btn-xl">301</router-link>
        <router-link to="/501" class="btn btn-primary btn-xl">501</router-link>
        <router-link to="/701" class="btn btn-primary btn-xl">701</router-link>
        <router-link to="/901" class="btn btn-primary btn-xl">901</router-link>
        <hr/>
        <h2>Ostatnie rozgrywki</h2>
        <em v-if="!previousGames">Chyba jeszcze nikt nie grał. Bądź pierwszy! {{ previousGames }}</em>
        <div class="text-center" v-if="previousGames">
          <PreviousGame v-for="game in previousGames" :key="game.date" :game="game"></PreviousGame>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PreviousGame from '@/components/PreviousGame'
import localForage from 'localforage'

export default {
  components: {
    PreviousGame
  },
  methods: {
    setPlayers () {
      let value = parseInt(document.getElementById('players').value);
      this.$store.commit('changePlayers', value)
    },
    async lastWinners () {
    }
  },
  asyncComputed: {
    async previousGames () {
      return await localForage.getItem('games')
    }
  }
}
</script>

<style>
section {
  margin-top: 20px;
}

.btn {
  padding: 10px 50px;
  margin: 4px 10px;
}

.logo {
  height: 200px;
  margin: 30px auto;
}

h1 {
  margin-bottom: 20px;
}

h2 {
  margin: 25px 0px 30px 0px;
}
</style>
