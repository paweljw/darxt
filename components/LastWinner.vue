<template>
  <tr>
    <td class="col-5">
      <p><strong>{{ winner.nameOne }}</strong><p>
      <p :class="winner.scoreOne == 0 ? 'text-success' : ''">{{ winner.scoreOne }}</p>
    </td>
    <td class="col-2" style="vertical-align: middle"><strong>vs</strong></td>
    <td class="col-5">
      <p><strong>{{ winner.nameTwo }}</strong><p>
      <p :class="winner.scoreTwo == 0 ? 'text-success' : ''">{{ winner.scoreTwo }}</p>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['winner']
}
</script>
