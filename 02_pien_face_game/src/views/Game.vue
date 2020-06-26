<template>
  <div class="game d-flex flex-column">
    <div class="d-flex m-2 justify-content-end border-bottom">
      <h1>残り時間: {{restTime}}秒</h1>
    </div>
    <div class="d-flex main-content justify-content-center">
      <span class="align-self-center">{{target}}</span>
    </div>
    <div class="d-flex justify-content-center">
      <b-button size="lg" variant="outline-primary button-font mr-5" v-on:click="onClickAnswerBtn(true)">ぴえん</b-button>
      <b-button size="lg" variant="outline-danger button-font" v-on:click="onClickAnswerBtn(true)">Notぴえん</b-button>
    </div>
  </div>
</template>

<script>
// 問題データ
const QUESTION_EMOJIS = ['🥺', '🤔', '😇', '😂', '😀', '🙃', '😍']

export default {
  name: 'Game',
  components: {
  },
  data () {
    return {
      restTime: 30,  // 残り時間
      target: "",    // 中央に表示される文字
      answered: 0,   // 解答数
      corrected: 0   // 正解数
    }
  },
  methods: {
    beforeGame: function () {
      // ゲーム開始前の処理
      let countdown = 3
      this.target = countdown
      const timer = setInterval(() => {
        countdown--
        if (countdown == 0) {
          clearInterval(timer)
          this.startGame()
          return
        } 
        this.target = countdown
      }, 1000)
    },
    startGame: function () {
      // ゲームのメイン処理
      this.setQuestionEmoji()
      const timer = setInterval(() => {
        this.restTime--
        if (this.restTime == 0) {
          clearInterval(timer)
          this.finishGame()
          return
        } 
      }, 1000)
    }, 
    finishGame: function () {
      // ゲーム終了時の処理
      this.$router.replace({ name: 'Result', params: { answered: this.answered, corrected: this.corrected} })
    },
    onClickAnswerBtn: function (isPien) {
      if ((this.target == '🥺') == isPien) {
        this.corrected++
      }
      this.answered++
      this.setQuestionEmoji()
    },
    setQuestionEmoji: function () {
      // 問題データの配列からランダムで絵文字を設定
      const idx = Math.floor(Math.random() * QUESTION_EMOJIS.length)
      this.target = QUESTION_EMOJIS[idx]
    }
  },
  mounted: function () {
  // 画面のロードが完了し、動作可能になったタイミングで呼ばれる
  this.beforeGame()
  }
}
</script>

<style scoped>
.game {
  height: 100vh;
}
.main-content {
  height: 60vh;
  font-size: 8rem;
}
.button-font {
  font-size: 250%;
}
</style>