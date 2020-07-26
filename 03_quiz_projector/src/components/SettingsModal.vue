<template>
  <div>
    <b-modal id="SettingsModal" title="投影画面設定" ok-title="保存して閉じる" cancel-title="キャンセル"
      v-on:ok="onOkClicked">
      <b-form-group label="X位置" horizontal :label-cols="6">
        <b-form-input v-model="x" type="number"></b-form-input>
      </b-form-group>
      <b-form-group label="Y位置" horizontal :label-cols="6">
        <b-form-input v-model="y" type="number"></b-form-input>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'SettingsModal',
  data () {
    return {
      x: 0, // X位置
      y: 0, // Y位置
    }
  },
  methods: {
    onOkClicked: function () {
      ipcRenderer.invoke('saveSettingsFile', {pjWinX: parseInt(this.x), pjWinY: parseInt(this.y)})
    }
  },
  mounted: function () {
    // 保存されている設定を読み込む
    ipcRenderer.invoke('getSettingsFile').then((data) => {
      this.x = data.pjWinX
      this.y = data.pjWinY
    })
  }
}
</script>