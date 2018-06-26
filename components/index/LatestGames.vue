<template>
  <div>
    <em v-if="!previousGames">{{ $t('index.latestGamesEmpty') }}</em>
    <div class="text-center" v-if="previousGames">
      <PreviousGame v-for="(game, index) in previousGames.slice(0, 10)" :key="index" :game="game"></PreviousGame>
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
  asyncComputed: {
    async previousGames () {
      return await localForage.getItem('games')
    }
  }
}
</script>

