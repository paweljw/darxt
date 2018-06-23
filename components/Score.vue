<template>
  <p :class="score.over || score.value == 0 ? 'text-danger' : ''">{{ score.value }}</p>
</template>

<script>
export default {
  props: ['score']
}
</script>
