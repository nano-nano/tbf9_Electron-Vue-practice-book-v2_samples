<template>
  <div class="result d-flex flex-column justify-content-center">
    <div class="d-flex justify-content-center">
      <h1>🥺結果発表🥺</h1>
    </div>
    <div class="d-flex flex-column justify-content-center m-5">
      <div class="d-flex justify-content-center">
        <h1>回答数: {{ $route.params.answered }}問 / 正解率: {{ (this.$route.params.accuracyRate * 100).toFixed(2) }}％</h1>
      </div>
      <div class="d-flex justify-content-center">
        <h1>{{finishMsg}}</h1>
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
    finishMsg: function () {
      // 解答数と正解率でスコアを算出
      const score = this.$route.params.answered * this.$route.params.accuracyRate
      if (score >= 50) {
        return 'すばらしい！！ぴえんマスター！！'
      } else if (score >= 40) {
        return 'すごい！ぴえんプロ！'
      } else if (score >= 30) {
        return 'ノーマルぴえんです'
      } else {
        return 'もうすこしぴえんしましょう……'
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