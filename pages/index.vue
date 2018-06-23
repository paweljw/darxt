<template>
  <section class="text-center">
    <img src="/darts.png" class="logo">
    <div class="header">
      <h1>Wybierz rodzaj rozgrywki</h1>
    </div>
    <router-link to="/301" class="btn btn-primary btn-xl">301</router-link>
    <router-link to="/501" class="btn btn-primary btn-xl">501</router-link>
    <router-link to="/701" class="btn btn-primary btn-xl">701</router-link>
    <router-link to="/901" class="btn btn-primary btn-xl">901</router-link>
    <hr/>
    <h2>Ostatnie rozgrywki</h2>
    <em v-if="!lastWinners">Chyba jeszcze nikt nie grał. Bądź pierwszy!</em>
    <table class="table" v-if="lastWinners">
      <LastWinner v-for="(winner, index) in lastWinners.slice(0, 10)" :winner="winner" :key="index"></LastWinner>
    </table>
  </section>
</template>

<script>
import LastWinner from '@/components/LastWinner'

export default {
  components: {
    LastWinner
  },
  computed: {
    lastWinners () {
      if(window.localStorage.lastWinners) {
        return JSON.parse(window.localStorage.lastWinners)
      } else {
        return false
      }
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
  margin-right: 12px;
}

.logo {
  height: 200px;
  margin-bottom: 20px;
}

.header h1 {
  margin-bottom: 20px;
}

h2 {
  margin: 25px 0px 30px 0px;
}
</style>
