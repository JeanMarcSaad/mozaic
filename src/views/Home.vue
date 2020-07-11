<template>
  <div class="home">
    <!-- <h3>Mozaic Generator <span class="badge badge-pill badge-light" style="vertical-align: top">1.0</span></h3> -->
    <div>
      <br>
      <h2 style="display: inline-block">Mozaic Generator‎‎‏‏‎ ‎</h2>
      <!-- <span class="badge badge-pill badge-light" style="vertical-align: top">by Jean-Marc Saad</span> -->
      <span class="badge badge-pill badge-dark" style="vertical-align: top">1.0</span>
    </div>
    <br>
    <Mozaic />
    <!-- <footer>by <u>Jean-Marc Saad</u></footer> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Mozaic from '@/components/Mozaic.vue'

export default {
  name: 'Home',
  components: {
    Mozaic
  }
}
</script>

<style lang="scss">
</style>