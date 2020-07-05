<template>
  <div class="home">
    <!-- ファイルインポートコンポーネント -->
    <ImportedFileView class="m-2"
      v-bind:importedFilePath="importedFilePath" v-on:onFilePathUpdated="onNewFileSelected" />
    <!-- 問題プレビューエリア -->
    <div class="d-flex justify-content-between mx-2 my-4">
      <b-button variant="outline-primary" size="lg" class="text-nowrap"
        v-bind:disabled="currentIdx == 0" v-on:click="onClickPrevBtn">＜＜前の問題</b-button>
      <div class="card question-area">
        <div class="card-body">
          <div class="font-weight-bold">【問題】</div>
          <div><span v-html="questionStr" /></div>
          <div class="font-weight-bold mt-4">【答え】</div>
          <div><span v-html="answerStr" /></div>
        </div>
      </div>
      <b-button variant="outline-primary" size="lg" class="text-nowrap" 
        v-bind:disabled="currentIdx + 1 == qDataArray.length" v-on:click="onClickNextBtn">次の問題＞＞</b-button>
    </div>
    <!-- オペレーションエリア -->
    <div class="d-flex justify-content-center mx-2 my-4">
      <b-button variant="outline-primary" size="lg" class="mx-3">問題を表示</b-button>
      <b-button variant="outline-primary" size="lg" class="mx-3">解答を表示</b-button>
      <b-button variant="outline-primary" size="lg" class="mx-3">表示をすべて消す</b-button>
      <b-button variant="outline-secondary" size="lg" class="ml-5">表示設定</b-button>
    </div>
  </div>
</template>

<script>
// @はsrc1のパスを表現するエイリアス
import ImportedFileView from '@/components/ImportedFileView.vue'
import ExcelFileUtils from '@/utils/ExcelFileUitls.js'

const DEFAULT_PATH_MSG = '問題ファイルを選択するか、ここへドラッグしてください'

export default {
  name: 'Home',
  components: {
    ImportedFileView
  },
  data () {
    return {
      qDataArray: [],                      // 問題データ配列
      currentIdx: 0,                       // 現在参照中の問題データ配列インデックス
      importedFilePath: DEFAULT_PATH_MSG,  // 問題データファイルのPATH
      questionStr: "",                     // 問題文
      answerStr: "",                       // 正解文
    }
  },
  methods: {
    onNewFileSelected: function (params) {
      this.importedFilePath = params.path != '' ? params.path : DEFAULT_PATH_MSG
      if (params.path  != '') {
        // 問題をインポートする
        ExcelFileUtils.importQuizData(params.path).then((dataArray) => {
          this.qDataArray = dataArray
          this._setQuestionData(0)
        })
      } else {
        this.qDataArray = []
        this.questionStr = ''
        this.answerStr = ''
      }
    },
    _setQuestionData: function (index) {
      this.questionStr = this.qDataArray[index].question
      this.answerStr = this.qDataArray[index].answer
      this.currentIdx = index
    },
    onClickPrevBtn: function () {
      this._setQuestionData(this.currentIdx - 1)
    },
    onClickNextBtn: function () {
      this._setQuestionData(this.currentIdx + 1)
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped>
.question-area {
  height: 50vh;
  width: 55vw;
}
</style>
