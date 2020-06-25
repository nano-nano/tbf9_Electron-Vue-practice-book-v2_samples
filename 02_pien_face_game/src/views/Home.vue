<template>
  <div class="home d-flex flex-column justify-content-center">
    <div class="d-flex justify-content-center">
      <div class="pb-5">
        <span class="title">🥺ぴえんゲーム🥺</span>
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
      // vue-routerで画面遷移する
      this.$router.replace({ name: 'Game' })
    }
  }
}
</script>

<style scoped>
.home {
  height: 100vh;
}
.title {
  font-size: 4rem;
}
</style>