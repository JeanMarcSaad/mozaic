<template>
  <div class="home">
    <header class="mozaic-title">
      <h2 style="display: inline-block">Mozaic Generator‎‎‏‏‎ ‎</h2>
      <span class="badge badge-pill badge-dark" style="vertical-align: top">0.1.0</span>
    </header>
    <Mozaic />
  </div>
</template>

<script>
import Mozaic from '@/components/Mozaic.vue'

export default {
  name: 'Home',
  components: {
    Mozaic
  }
}
</script>