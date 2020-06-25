<template>
  <div class="home d-flex flex-column justify-content-center">
    <div class="d-flex justify-content-center">
      <div class="pb-5">
        <h1>🥺ぴえんゲーム</h1>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <div class="d-flex">
        <b-button size="lg" variant="outline-primary" v-on:click="moveToGame">はじめる</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  methods: {
    moveToGame: function () {
      this.$router.replace({ name: 'Game' })
    }
  }
}

</script>
<style scoped>
.home {
  height: 100vh;
}
</style>