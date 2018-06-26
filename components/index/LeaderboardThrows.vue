<template>
  <table class="table">
    <thead>
      <tr>
        <th>{{ $t('leaderboard.name') }}</th>
        <th>{{ $t('leaderboard.average') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="leader in leaders" :key="leader.name">
        <td>{{ leader.name }}</td>
        <td>{{ leader.average }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localForage from 'localforage'

export default {
  asyncComputed: {
    async leaders () {
      const leaders = await localForage.getItem('throws')

      const reformattedLeaders = Object.keys(leaders).map((key) => {
        const average = leaders[key]
        return { name: key, average: average.toFixed(2) }
      })

      return reformattedLeaders.sort((a, b) => b.average - a.average).slice(0, 10)
    }
  }
}
</script>
