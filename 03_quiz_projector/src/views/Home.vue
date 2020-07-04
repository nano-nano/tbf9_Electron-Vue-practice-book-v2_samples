<template>
  <div class="home">
    <!-- ファイルインポートコンポーネント -->
    <ImportedFileView class="m-2" v-bind:importedFilePath="importedFilePath" v-on:onFilePathUpdated="onNewFileSelected" />
    <!-- 問題プレビューエリア -->
    <div class="d-flex justify-content-between mx-2 my-4">
      <b-button variant="outline-primary" size="lg" class="text-nowrap">＜＜前の問題</b-button>
      <div class="card question-area">
        <div class="card-body">
          <div class="font-weight-bold">【問題】</div>
          <div><span v-html="questionStr" /></div>
          <div class="font-weight-bold mt-4">【答え】</div>
          <div><span v-html="answerStr" /></div>
        </div>
      </div>
      <b-button variant="outline-primary" size="lg" class="text-nowrap">次の問題＞＞</b-button>
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
import ImportedFileView from '@/components/ImportedFileView.vue'

export default {
  name: 'Home',
  components: {
    ImportedFileView
  },
  data () {
    return {
      qDataarray: [],     // 問題データ配列
      importedFilePath: 'ファイルを選択してください',  // 問題データファイルのPATH
      questionStr: "",       // 問題文
      answerStr: "",         // 正解文
    }
  },
  methods: {
    onNewFileSelected: function (params) {
      this.importedFilePath = params.path != '' ? params.path : 'ファイルを選択してください'
    }
  },
  mounted: function () {
    // TODO: デバッグ用
    this.questionStr = "問題ああああああああああああああああああああああああ"
    this.answerStr = "答えああああああああああああああああああああああああ"
  }
}
</script>

<style scoped>
.question-area {
  height: 50vh;
  width: 55vw;
}
</style>
