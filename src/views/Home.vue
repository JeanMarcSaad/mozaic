<template>
  <div class="home">
    <header class="mozaic-title">
      <h2 style="display: inline-block">Mozaic Generator‎‎‏‏‎ ‎</h2>
      <span class="badge badge-pill badge-dark" style="vertical-align: top">{{version}}</span>
      <h6 class="author-title">By <a href="https://github.com/JeanMarcSaad">Jean-Marc Saad</a></h6>
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
  },
  computed: {
    version: () => {
      return process.env.VUE_APP_VERSION;
    }
  }
}
</script>