<template>
  <div class="importedFileView card">
      <div class="card-body" v-on:dragover.prevent v-on:drop="onDragFile">
        <div class="h4">問題データファイル（ここにドラッグも可）</div>
        <div class="d-flex">
            <div class="flex-grow-1 text-truncate" style="align-self: center">{{importedFilePath}}</div>
            <b-button variant="primary" class="text-nowrap" v-on:click="onClickFileSelectBtn">ファイル選択</b-button>
        </div>
      </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'ImportedFileView',
  props: {
    importedFilePath: String
  },
  methods: {
    onDragFile: function (event) {
      const files = event.target.files || event.dataTransfer.files;
      if (files != undefined && files[0] != undefined) {
        const extension = files[0].name.slice((files[0].name.lastIndexOf('.') - 1 >>> 0) + 2)
        // 拡張子を確認
        if (extension != 'xls' || extension != 'xlsx') return
        this.onFilePathUpdated(files[0].path)
      } else {
        this.onFilePathUpdated('')
      }
    },
    onClickFileSelectBtn: function () {
      ipcRenderer.invoke('showFileSelectDialog').then((files) => {
        if (files != undefined && files[0] != undefined) {
          this.onFilePathUpdated(files[0])
        } else {
          this.onFilePathUpdated('')
        }
      })
    },
    onFilePathUpdated: function (path) {
      this.$emit('onFilePathUpdated', { path: path })
    }
  }
}
</script>

<style scoped>
.importedFileView {
    background-color: #e7e7e7;
}
</style>