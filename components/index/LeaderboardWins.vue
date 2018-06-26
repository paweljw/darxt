<template>
  <table class="table">
    <thead>
      <tr>
        <th>{{ $t('leaderboard.name') }}</th>
        <th>{{ $t('leaderboard.score') }}</th>
        <th>{{ $t('leaderboard.wins') }}</th>
        <th>{{ $t('leaderboard.losses') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="leader in leaders" :key="leader.name">
        <td>{{ leader.name }}</td>
        <td><strong>{{ leader.score }}</strong></td>
        <td class="text-success">{{ leader.wins }}</td>
        <td class="text-warning">{{ leader.losses }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localForage from 'localforage'

export default {
  asyncComputed: {
    async leaders () {
      const wins = await localForage.getItem('wins') || []
      const losses = await localForage.getItem('losses') || []

      let scores = {}

      Object.keys(wins).forEach(key => {
        let name = key
        let winCount = wins[name]
        scores[name] = scores[name] || {}
        scores[name].score = scores[name].score || 0
        scores[name].score += winCount
        scores[name].wins = winCount
      })

      Object.keys(losses).forEach(key => {
        let name = key
        let lossCount = losses[name]
        scores[name] = scores[name] || {}
        scores[name].score = scores[name].score || 0
        scores[name].score -= lossCount
        scores[name].losses = lossCount
      })

      let augmentedScores = Object.keys(scores).map(key => {
        let score = scores[key]
        score.name = key
        return score
      })

      augmentedScores = augmentedScores.sort((a, b) => {
        return b.score - a.score
      })

      return augmentedScores.slice(0, 10)
    }
  }
}
</script>
