<template>
  <div class="projection">
    <!-- 問題表示エリア -->
    <transition name="fade">
      <div class="card m-4" v-show="isShowQuestionArea">
        <div class="card-body">
          <h1 class="card-title mb-4">【問題】</h1>
          <h2><span v-html="questionStr" /></h2>
        </div>
      </div>
    </transition>
    <!-- 解答表示エリア -->
    <transition name="fade">
      <div class="card m-4" v-show="isShowAnswerArea">
        <div class="card-body mb-4">
          <h1 class="card-title">【解答】</h1>
          <h2><span v-html="answerStr" /></h2>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'Projection',
  components: {
  },
  data () {
    return {
      isShowQuestionArea: false,
      questionStr: '',
      isShowAnswerArea: false,
      answerStr: '',
    }
  },
  mounted () {
    ipcRenderer.on('operationProjection', (event, data) => {
      switch (data.operation) {
        case 'question':
          this.isShowQuestionArea = data.isShow
          this.questionStr = data.str
          break;
        case 'answer':
          this.isShowAnswerArea = data.isShow
          this.answerStr = data.str
          break;
        default: 
          // 何もしない
      }
    })
  }
}
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter {
  opacity: 0;
}
</style>
