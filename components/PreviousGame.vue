<template>
  <div class="row">
    <div class="col-12">
      <h5>
        Typ gry: <strong>{{ game.game }}</strong>
        Rozegrana: <strong>{{ game.date.toLocaleDateString() }} {{ game.date.toLocaleTimeString() }}</strong>
      </h5>
    </div>
    <div :class="'col ' + (player.score == 0 ? 'alert-success' : '')" v-for="player in game.players" :key="player.name">
      <strong>{{ player.name }}</strong>
      <br/>{{ player.score }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['game']
}
</script>

<style scoped=true>
.col {
  padding: 7px 0px;
}

.row {
  padding: 20px 0px;
  border-bottom: 1px solid #eee;
}

h5 {
  margin-bottom: 20px;
}
</style>
