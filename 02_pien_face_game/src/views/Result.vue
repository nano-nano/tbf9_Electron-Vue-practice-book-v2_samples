<template>
  <div class="result d-flex flex-column justify-content-center">
    <div class="d-flex justify-content-center">
      <h1>🥺結果発表🥺</h1>
    </div>
    <div class="d-flex flex-column justify-content-center m-5">
      <div class="d-flex justify-content-center">
        <h1>回答数: {{ $route.params.answered }}問 / 正解率: {{accuracyRate}}％</h1>
      </div>
      <div class="d-flex justify-content-center">
        <h1>おめでとう！</h1>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <b-button size="lg" variant="outline-primary" v-on:click="moveToHome">ホーム画面へもどる</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Result',
  components: {
  },
  computed: {
    accuracyRate: function () {
      // 正解率表示
      if (this.$route.params.answered == 0) {
        return 0
      } else {
        return ((this.$route.params.corrected  / this.$route.params.answered) * 100).toFixed(2)
      }
    }
  },
  methods: {
    moveToHome: function () {
      this.$router.replace({ name: 'Home' })
    }
  }
}
</script>

<style scoped>
.result {
  height: 100vh;
}
</style>