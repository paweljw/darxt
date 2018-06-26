<template>
  <div class="container">
    <div class="float-right">
      <nuxt-link
        style="font-size: 200%"
        v-for="locale in $i18n.locales"
        v-if="locale.code !== $i18n.locale"
        :key="locale.code"
        :to="switchLocalePath(locale.code)">{{ locale.name }}</nuxt-link>
      </div>
    <div class="row">
      <div class="col text-center">
        <img src="/darts.png" class="logo">
        <h1>{{ $t('index.gameType') }}</h1>
        <div class="form-group form-horizontal col-xs-12 col-md-6 offset-md-3">
          <label for="players">{{ $t('index.playerCount') }}: </label>
          <input name="players" id="players" class="form-control" type="number" :value="$store.state.players" min="2"
            max="4" @change="setPlayers">
        </div>
        <nuxt-link :to="localePath('301')" class="btn btn-primary btn-xl">301</nuxt-link>
        <nuxt-link :to="localePath('501')" class="btn btn-primary btn-xl">501</nuxt-link>
        <nuxt-link :to="localePath('701')" class="btn btn-primary btn-xl">701</nuxt-link>
        <nuxt-link :to="localePath('901')" class="btn btn-primary btn-xl">901</nuxt-link>
        <hr/>
        <b-tabs>
          <b-tab :title="$t('index.latestGames')" active>
            <LatestGames />
          </b-tab>
          <b-tab :title="$t('index.leaderboardWins')">
            <LeaderboardWins />
          </b-tab>
          <b-tab :title="$t('index.leaderboardThrows')">
            <LeaderboardThrows />
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import LatestGames from '@/components/index/LatestGames'
import LeaderboardWins from '@/components/index/LeaderboardWins'
import LeaderboardThrows from '@/components/index/LeaderboardThrows'

export default {
  components: {
    LatestGames,
    LeaderboardWins,
    LeaderboardThrows
  },
  methods: {
    setPlayers () {
      let value = parseInt(document.getElementById('players').value);
      this.$store.commit('changePlayers', value)
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
</style>
